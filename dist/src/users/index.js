"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@graphql-modules/core");
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
exports.userModule = new core_1.GraphQLModule({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    context: (session) => ({
        pubsub: session.pubsub,
        redis: session.redis,
        mongo: session.mongo,
    }),
});
//# sourceMappingURL=index.js.map