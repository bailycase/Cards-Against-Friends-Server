"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const createGame_1 = __importDefault(require("./requests/createGame"));
const joinGame_1 = __importDefault(require("./requests/joinGame"));
const leaveGame_1 = __importDefault(require("./requests/leaveGame"));
const getGame_1 = __importDefault(require("./requests/getGame"));
const startGame_1 = __importDefault(require("./requests/startGame"));
const stopGame_1 = __importDefault(require("./requests/stopGame"));
const selectCard_1 = __importDefault(require("./requests/selectCard"));
const selectWinningCard_1 = __importDefault(require("./requests/selectWinningCard"));
const resolvers = {
    Query: {
        getGame: (_, args, { mongo }) => getGame_1.default(args, mongo),
    },
    Mutation: {
        createGame: (_, args, { pubsub, mongo }) => createGame_1.default(args, pubsub, mongo),
        joinGame: (_, args, { pubsub, mongo }) => joinGame_1.default(args, pubsub, mongo),
        leaveGame: (_, args, { pubsub, mongo }) => leaveGame_1.default(args, pubsub, mongo),
        startGame: (_, args, { pubsub, mongo }) => startGame_1.default(args, pubsub, mongo),
        stopGame: (_, args, { pubsub, mongo }) => stopGame_1.default(args, pubsub, mongo),
        selectCard: (_, args, { pubsub, mongo }) => selectCard_1.default(args, pubsub, mongo),
        selectWinningCard: (_, args, { pubsub, mongo }) => selectWinningCard_1.default(args, pubsub, mongo)
    },
    Subscription: {
        game: {
            subscribe: apollo_server_1.withFilter((_, args, { pubsub }) => {
                return pubsub.asyncIterator(`${args.gameId}_GAME`);
            }, (payload, variables) => {
                return payload.game.gameId === variables.gameId;
            }),
        },
        gameDetails: {
            subscribe: apollo_server_1.withFilter((_, args, { pubsub }) => {
                return pubsub.asyncIterator(`${args.gameId}_DETAILS`);
            }, (payload, variables) => {
                return payload.gameDetails.gameId === variables.gameId;
            }),
        },
        cardsDealt: {
            subscribe: apollo_server_1.withFilter((_, args, { pubsub }) => {
                return pubsub.asyncIterator(`${args.gameId}_DETAILS_CARDS`);
            }, (payload, variables) => {
                return payload.cardsDealt.gameId === variables.gameId;
            }),
        },
        gamePlayers: {
            subscribe: apollo_server_1.withFilter((_, args, { pubsub }) => {
                return pubsub.asyncIterator(`${args.gameId}_PLAYERS`);
            }, (payload, variables) => {
                return payload.gamePlayers.gameId === variables.gameId;
            }),
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map