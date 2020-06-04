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
const leaveGame = (args, pubsub, mongo) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, name } = args;
    // Mongo
    const db = yield mongo();
    const gameCollection = db.collection("game");
    const usersCurrentGame = yield gameCollection.findOne({
        gameId,
        users: { $elemMatch: { name } },
    });
    if (!usersCurrentGame)
        return new apollo_server_1.ApolloError("You are not currently in a game");
    const { users, host, _id } = usersCurrentGame;
    // If the user trying to leave is the last one in the game
    if (users.length === 1) {
        yield gameCollection.findOneAndDelete({ _id });
        return true;
    }
    // If the current user leaving is the host
    let newHost;
    if (host === name) {
        const nextHost = () => {
            return users.filter((user) => user.name !== name)[0];
        };
        newHost = nextHost();
        yield gameCollection.findOneAndUpdate({ _id }, { $set: { host: newHost.name } });
    }
    const data = yield gameCollection.findOneAndUpdate({ _id }, { $pull: { users: { name: name } } });
    if (!data.value)
        return new apollo_server_1.ApolloError("There was an error leaving the game");
    if (!newHost)
        newHost = host;
    pubsub.publish(`${gameId}_PLAYERS`, {
        gamePlayers: {
            event: "USER_LEAVE",
            gameId,
            userLeft: {
                name,
            },
            host: newHost,
        },
    });
    return true;
});
exports.default = leaveGame;
//# sourceMappingURL=leaveGame.js.map