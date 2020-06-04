"use strict";
exports.__esModule = true;
var core_1 = require("@graphql-modules/core");
var resolvers_1 = require("./resolvers");
var typedefs_1 = require("./typedefs");
var index_1 = require("../users/index");
exports.gameModule = new core_1.GraphQLModule({
    typeDefs: typedefs_1["default"],
    resolvers: resolvers_1["default"],
    imports: [index_1.userModule],
    context: function (session) { return ({
        pubsub: session.pubsub,
        redis: session.redis,
        mongo: session.mongo
    }); }
});
