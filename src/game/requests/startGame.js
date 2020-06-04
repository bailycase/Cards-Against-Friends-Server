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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
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
var startGame = function (args, pubsub, mongo) { return __awaiter(void 0, void 0, void 0, function () {
    var gameId, name, db, gameCollection, gameAgg, game, updatedGame, cardCzar, running, id, users, _id, cardCollection, numberOfCardsets, blackCard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gameId = args.gameId, name = args.name;
                return [4 /*yield*/, mongo()];
            case 1:
                db = _a.sent();
                gameCollection = db.collection("game");
                gameAgg = [
                    {
                        $set: {
                            cardCzar: "$host",
                            running: {
                                $cond: [
                                    {
                                        $eq: ["$host", name]
                                    },
                                    true,
                                    false,
                                ]
                            }
                        }
                    },
                ];
                return [4 /*yield*/, gameCollection.findOneAndUpdate({ gameId: gameId }, gameAgg, {
                        returnOriginal: true
                    })];
            case 2:
                game = _a.sent();
                if (game.value.host !== name) {
                    return [2 /*return*/, new apollo_server_1.ApolloError("Only the host can start the game!")];
                }
                if (game.value.running === true) {
                    return [2 /*return*/, new apollo_server_1.ApolloError("The game is already running")];
                }
                return [4 /*yield*/, gameCollection.findOne({ gameId: gameId })];
            case 3:
                updatedGame = _a.sent();
                cardCzar = updatedGame.cardCzar, running = updatedGame.running, id = updatedGame.gameId, users = updatedGame.users, _id = updatedGame._id;
                pubsub.publish(gameId + "_DETAILS", {
                    gameDetails: {
                        gameId: id,
                        event: "GAME_STARTED",
                        roundStatus: 'PICKING_CARDS',
                        running: running,
                        cardCzar: cardCzar
                    }
                });
                cardCollection = db.collection("card-sets");
                return [4 /*yield*/, cardCollection.countDocuments()];
            case 4:
                numberOfCardsets = _a.sent();
                users.forEach(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                    var randomInt, deck, cards;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                randomInt = function (limiter) { return Math.floor(Math.random() * limiter); };
                                return [4 /*yield*/, cardCollection
                                        .find()
                                        .limit(1)
                                        .skip(randomInt(numberOfCardsets))
                                        .next()];
                            case 1:
                                deck = _a.sent();
                                cards = getRandom(deck.whiteCards, 5);
                                if (!!blackCard) return [3 /*break*/, 3];
                                blackCard = deck.blackCards[randomInt(deck.blackCards.length)].text;
                                return [4 /*yield*/, gameCollection.findOneAndUpdate({ _id: _id }, { $set: { blackCard: blackCard } }, { returnOriginal: false })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                pubsub.publish(gameId + "_DETAILS_CARDS", {
                                    cardsDealt: {
                                        gameId: id,
                                        user: user.name,
                                        blackCard: blackCard,
                                        cards: cards
                                    }
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, updatedGame];
        }
    });
}); };
exports["default"] = startGame;
