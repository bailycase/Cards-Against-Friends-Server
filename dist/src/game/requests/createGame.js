"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const createGame = (args, pubsub, mongo) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, host } = args;
    // Mongo
    const db = yield mongo();
    const gameCollection = db.collection("game");
    const hasAGame = yield gameCollection.findOne({ host });
    if (hasAGame)
        return new apollo_server_1.ApolloError("You already have a game created");
    try {
        yield gameCollection.insertOne({ gameId, host });
        pubsub.publish('GAME_CREATED', { gameName: `${gameId}_GAME` });
        pubsub.publish(`${gameId}_GAME`, { gameId });
    }
    catch (_a) {
        return new apollo_server_1.ApolloError("There was an error creating your game");
    }
    return { gameId };
});
exports.default = createGame;
//# sourceMappingURL=createGame.js.map