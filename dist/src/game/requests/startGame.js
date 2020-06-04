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
const startGame = (args, pubsub, mongo) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, name } = args;
    const db = yield mongo();
    const gameCollection = db.collection("game");
    const gameAgg = [
        {
            $set: {
                cardCzar: "$host",
                running: {
                    $cond: [
                        {
                            $eq: ["$host", name],
                        },
                        true,
                        false,
                    ],
                },
            },
        },
    ];
    const game = yield gameCollection.findOneAndUpdate({ gameId }, gameAgg, {
        returnOriginal: true,
    });
    if (game.value.host !== name) {
        return new apollo_server_1.ApolloError("Only the host can start the game!");
    }
    if (game.value.running === true) {
        return new apollo_server_1.ApolloError("The game is already running");
    }
    const updatedGame = yield gameCollection.findOne({ gameId });
    const { cardCzar, running, gameId: id, users, _id } = updatedGame;
    pubsub.publish(`${gameId}_DETAILS`, {
        gameDetails: {
            gameId: id,
            event: "GAME_STARTED",
            roundStatus: 'PICKING_CARDS',
            running,
            cardCzar,
        },
    });
    // Logic related to giving out cards
    const cardCollection = db.collection("card-sets");
    const numberOfCardsets = yield cardCollection.countDocuments();
    let blackCard;
    users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
        //if (user.name === cardCzar) return;
        const randomInt = (limiter) => Math.floor(Math.random() * limiter);
        const deck = yield cardCollection
            .find()
            .limit(1)
            .skip(randomInt(numberOfCardsets))
            .next();
        const cards = getRandom(deck.whiteCards, 5);
        if (!blackCard) {
            blackCard = deck.blackCards[randomInt(deck.blackCards.length)].text;
            yield gameCollection.findOneAndUpdate({ _id }, { $set: { blackCard: blackCard } }, { returnOriginal: false });
        }
        pubsub.publish(`${gameId}_DETAILS_CARDS`, {
            cardsDealt: {
                gameId: id,
                user: user.name,
                blackCard: blackCard,
                cards,
            },
        });
    }));
    return updatedGame;
});
exports.default = startGame;
//# sourceMappingURL=startGame.js.map