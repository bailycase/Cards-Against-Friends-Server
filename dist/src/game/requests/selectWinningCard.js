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
const selectWinningCard = (args, pubsub, mongo) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, gameId, winningUser } = args;
    const db = yield mongo();
    const gameCollection = db.collection("game");
    // Check if the user requesting is the cardCzar
    const currentGame = yield gameCollection.findOne({ gameId, "cardCzar": name });
    console.log(gameId, name);
    const nextCardCzar = currentGame.users.filter((user) => user.name !== currentGame.cardCzar);
    const clearSelectedCardsAgg = [
        {
            $set: {
                "users.cardSelected": null
            }
        }
    ];
    // Give the winning player a point
    if (currentGame && currentGame.cardCzar === name) {
        yield gameCollection.findOneAndUpdate({ gameId, "users.name": winningUser, cardCzar: name }, { $inc: { "users.$.points": 1 }, $set: { cardCzar: nextCardCzar[0].name } }, { returnOriginal: false });
        const updatedGame = yield gameCollection.findOneAndUpdate({ gameId }, clearSelectedCardsAgg);
        // Broadcast the new game data
        pubsub.publish(`${gameId}_PLAYERS`, {
            gamePlayers: {
                event: "USER_WIN_ROUND",
                gameId,
                users: updatedGame.value.users,
            },
        });
        pubsub.publish(`${gameId}_DETAILS`, {
            gameDetails: {
                event: "ROUND_UPDATE",
                gameId,
                roundStatus: "PICKING_CARDS",
                running: true,
                cardCzar: updatedGame.value.cardCzar,
            },
        });
        return true;
    }
    return false;
});
exports.default = selectWinningCard;
//# sourceMappingURL=selectWinningCard.js.map