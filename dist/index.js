"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const fs_1 = __importDefault(require("fs"));
require("reflect-metadata");
const https_1 = __importDefault(require("https"));
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const index_1 = require("./src/cards/index");
const index_2 = require("./src/users/index");
const index_3 = require("./src/game/index");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const ioredis_1 = __importDefault(require("ioredis"));
const express_1 = __importDefault(require("express"));
const getDb_1 = __importDefault(require("./src/utils/getDb"));
const viewBuilder_1 = require("./viewBuilder");
const typeDefs = merge_graphql_schemas_1.mergeTypes([
    index_1.cardsModule.typeDefs,
    index_2.userModule.typeDefs,
    index_3.gameModule.typeDefs,
]);
const resolvers = merge_graphql_schemas_1.mergeResolvers([
    index_1.cardsModule.resolvers,
    index_2.userModule.resolvers,
    index_3.gameModule.resolvers,
]);
const options = {
    host: "10.15.246.162",
    port: 6379,
    retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
    },
};
const redis = new ioredis_1.default(options);
const pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
    publisher: new ioredis_1.default(options),
    subscriber: new ioredis_1.default(options),
});
const port = 3000;
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, pubsub: pubsub, redis: redis, mongo: getDb_1.default }),
});
const app = express_1.default();
server.applyMiddleware({ app });
const key = fs_1.default.readFileSync('./ssl/caf.key');
const cert = fs_1.default.readFileSync('./ssl/cert.key');
const httpServer = https_1.default.createServer({
    key,
    cert
}, app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen(port, () => {
    viewBuilder_1.buildView();
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
});
//# sourceMappingURL=index.js.map