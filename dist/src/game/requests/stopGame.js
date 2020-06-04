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
const stopGame = (args, pubsub, mongo) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, name } = args;
    const db = yield mongo();
    const gameCollection = db.collection("game");
    const gameAgg = [
        {
            $set: {
                running: {
                    $cond: [
                        {
                            $eq: ["$host", name],
                        },
                        false,
                        true,
                    ],
                },
                "users.cardSelected": null
            },
        },
    ];
    const game = yield gameCollection.findOneAndUpdate({ gameId }, gameAgg, {
        returnOriginal: true,
    });
    if (game.value.running === false) {
        return new apollo_server_1.ApolloError("Your game is not running");
    }
    const updatedGame = yield gameCollection.findOne({ _id: game.value._id });
    const { cardCzar, running, gameId: id } = updatedGame;
    pubsub.publish(`${gameId}_DETAILS`, {
        gameDetails: {
            gameId: id,
            event: "GAME_STOPPED",
            roundStatus: "STOPPED",
            running,
            cardCzar,
        },
    });
    return updatedGame;
});
exports.default = stopGame;
//# sourceMappingURL=stopGame.js.map