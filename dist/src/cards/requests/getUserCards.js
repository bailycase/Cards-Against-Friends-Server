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
function getRandom(arr, n) {
    var result = new Array(n), len = arr.length, taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
const getUserCards = (args, pubsub, mongo) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, name } = args;
    const db = yield mongo();
    const gameCollection = db.collection("game");
    const currentGame = yield gameCollection.findOne({ gameId });
    const { blackCard } = currentGame;
    // Logic related to giving out cards
    const cardCollection = db.collection("card-sets");
    const numberOfCardsets = yield cardCollection.countDocuments();
    //if (name === cardCzar) return;
    const randomInt = Math.floor(Math.random() * numberOfCardsets);
    const deck = yield cardCollection.find().limit(1).skip(randomInt).next();
    const cards = getRandom(deck.whiteCards, 5);
    pubsub.publish(`${gameId}_DETAILS_CARDS`, {
        cardsDealt: {
            blackCard,
            user: name,
            cards,
        },
    });
    return {
        user: name,
        blackCard,
        cards,
    };
});
exports.default = getUserCards;
//# sourceMappingURL=getUserCards.js.map