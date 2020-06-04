"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@graphql-modules/core");
const resolvers_1 = __importDefault(require("./resolvers"));
const typedefs_1 = __importDefault(require("./typedefs"));
const index_1 = require("../users/index");
exports.gameModule = new core_1.GraphQLModule({
    typeDefs: typedefs_1.default,
    resolvers: resolvers_1.default,
    imports: [index_1.userModule],
    context: (session) => ({
        pubsub: session.pubsub,
        redis: session.redis,
        mongo: session.mongo,
    }),
});
//# sourceMappingURL=index.js.map