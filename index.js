"use strict";
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
require("reflect-metadata");
var http_1 = require("http");
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var index_1 = require("./src/cards/index");
var index_2 = require("./src/users/index");
var index_3 = require("./src/game/index");
var graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
var ioredis_1 = require("ioredis");
var express_1 = require("express");
var getDb_1 = require("./src/utils/getDb");
var viewBuilder_1 = require("./viewBuilder");
var typeDefs = merge_graphql_schemas_1.mergeTypes([
    index_1.cardsModule.typeDefs,
    index_2.userModule.typeDefs,
    index_3.gameModule.typeDefs,
]);
var resolvers = merge_graphql_schemas_1.mergeResolvers([
    index_1.cardsModule.resolvers,
    index_2.userModule.resolvers,
    index_3.gameModule.resolvers,
]);
var options = {
    host: "localhost",
    port: 6379,
    retryStrategy: function (times) {
        return Math.min(times * 50, 2000);
    }
};
var redis = new ioredis_1["default"](options);
var pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
    publisher: new ioredis_1["default"](options),
    subscriber: new ioredis_1["default"](options)
});
var port = 3000;
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: function (_a) {
        var req = _a.req, res = _a.res;
        return ({ req: req, res: res, pubsub: pubsub, redis: redis, mongo: getDb_1["default"] });
    }
});
var app = express_1["default"]();
server.applyMiddleware({ app: app });
var httpServer = http_1["default"].createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen(port, function () {
    viewBuilder_1.buildView();
    console.log("\uD83D\uDE80 Server ready at http://localhost:" + port + server.graphqlPath);
    console.log("\uD83D\uDE80 Subscriptions ready at ws://localhost:" + port + server.subscriptionsPath);
});
