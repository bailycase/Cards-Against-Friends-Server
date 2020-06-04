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
const joinGame = (args, pubsub, mongo) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, name } = args;
    // Mongo
    const db = yield mongo();
    const gameCollection = db.collection("game");
    //const userInGame = await gameCollection.findOne({
    //gameId,
    //users: name,
    //});
    //if (userInGame) return await gameCollection.findOne({
    //gameId
    //})
    // rewrite to aggregation
    const userCollection = db.collection("users");
    yield userCollection.findOneAndUpdate({ name }, { $set: { currentGame: gameId } });
    const data = yield gameCollection.findOneAndUpdate({ gameId }, { $push: { users: { name: name, points: 0 } } });
    if (!data.value)
        return new apollo_server_1.ApolloError("There was an error joining the game");
    const { host } = data.value;
    pubsub.publish(`${gameId}_PLAYERS`, {
        gamePlayers: {
            event: "USER_JOIN",
            gameId,
            host,
            userJoined: {
                name,
            },
        },
    });
    return data.value;
});
exports.default = joinGame;
//# sourceMappingURL=joinGame.js.map