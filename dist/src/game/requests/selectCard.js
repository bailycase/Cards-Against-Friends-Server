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
const selectCard = (args, pubsub, mongo) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, name, card } = args;
    const db = yield mongo();
    const gameCollection = db.collection("game");
    const currentGame = yield gameCollection.findOneAndUpdate({ gameId, "users.name": name }, { $set: { "users.$.cardSelected": card } }, { returnOriginal: false });
    const { cardCzar } = currentGame.value;
    // Check if all the users have selected a card, except the cardCzar
    const allSelected = currentGame.value.users.filter((user) => user.name !== cardCzar).map((user) => {
        if (user.cardSelected)
            return true;
        return false;
    });
    // Broadcast that a player has selected a card
    pubsub.publish(`${gameId}_PLAYERS`, {
        gamePlayers: {
            event: "USER_SELECT_CARD",
            gameId,
            user: name,
        },
    });
    // If all users have selected a card, push the game to the judging round
    if (!allSelected.includes(false)) {
        const usersCards = currentGame.value.users.filter((user) => user.name !== cardCzar).map((user) => {
            return { name: user.name, cardName: user.cardSelected };
        });
        pubsub.publish(`${gameId}_DETAILS`, {
            gameDetails: {
                event: "ROUND_UPDATE",
                gameId,
                roundStatus: "JUDGING_ROUND",
                running: true,
                cardCzar,
                cardsToJudge: usersCards
            },
        });
    }
    return true;
});
exports.default = selectCard;
//# sourceMappingURL=selectCard.js.map