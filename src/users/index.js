"use strict";
exports.__esModule = true;
var core_1 = require("@graphql-modules/core");
var typeDefs_1 = require("./typeDefs");
var resolvers_1 = require("./resolvers");
exports.userModule = new core_1.GraphQLModule({
    typeDefs: typeDefs_1["default"],
    resolvers: resolvers_1["default"],
    context: function (session) { return ({
        pubsub: session.pubsub,
        redis: session.redis,
        mongo: session.mongo
    }); }
});
