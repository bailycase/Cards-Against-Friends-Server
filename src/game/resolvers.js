"use strict";
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var createGame_1 = require("./requests/createGame");
var joinGame_1 = require("./requests/joinGame");
var leaveGame_1 = require("./requests/leaveGame");
var getGame_1 = require("./requests/getGame");
var startGame_1 = require("./requests/startGame");
var stopGame_1 = require("./requests/stopGame");
var selectCard_1 = require("./requests/selectCard");
var selectWinningCard_1 = require("./requests/selectWinningCard");
var resolvers = {
    Query: {
        getGame: function (_, args, _a) {
            var mongo = _a.mongo;
            return getGame_1["default"](args, mongo);
        }
    },
    Mutation: {
        createGame: function (_, args, _a) {
            var pubsub = _a.pubsub, mongo = _a.mongo;
            return createGame_1["default"](args, pubsub, mongo);
        },
        joinGame: function (_, args, _a) {
            var pubsub = _a.pubsub, mongo = _a.mongo;
            return joinGame_1["default"](args, pubsub, mongo);
        },
        leaveGame: function (_, args, _a) {
            var pubsub = _a.pubsub, mongo = _a.mongo;
            return leaveGame_1["default"](args, pubsub, mongo);
        },
        startGame: function (_, args, _a) {
            var pubsub = _a.pubsub, mongo = _a.mongo;
            return startGame_1["default"](args, pubsub, mongo);
        },
        stopGame: function (_, args, _a) {
            var pubsub = _a.pubsub, mongo = _a.mongo;
            return stopGame_1["default"](args, pubsub, mongo);
        },
        selectCard: function (_, args, _a) {
            var pubsub = _a.pubsub, mongo = _a.mongo;
            return selectCard_1["default"](args, pubsub, mongo);
        },
        selectWinningCard: function (_, args, _a) {
            var pubsub = _a.pubsub, mongo = _a.mongo;
            return selectWinningCard_1["default"](args, pubsub, mongo);
        }
    },
    Subscription: {
        game: {
            subscribe: apollo_server_1.withFilter(function (_, args, _a) {
                var pubsub = _a.pubsub;
                return pubsub.asyncIterator(args.gameId + "_GAME");
            }, function (payload, variables) {
                return payload.game.gameId === variables.gameId;
            })
        },
        gameDetails: {
            subscribe: apollo_server_1.withFilter(function (_, args, _a) {
                var pubsub = _a.pubsub;
                return pubsub.asyncIterator(args.gameId + "_DETAILS");
            }, function (payload, variables) {
                return payload.gameDetails.gameId === variables.gameId;
            })
        },
        cardsDealt: {
            subscribe: apollo_server_1.withFilter(function (_, args, _a) {
                var pubsub = _a.pubsub;
                return pubsub.asyncIterator(args.gameId + "_DETAILS_CARDS");
            }, function (payload, variables) {
                return payload.cardsDealt.gameId === variables.gameId;
            })
        },
        gamePlayers: {
            subscribe: apollo_server_1.withFilter(function (_, args, _a) {
                var pubsub = _a.pubsub;
                return pubsub.asyncIterator(args.gameId + "_PLAYERS");
            }, function (payload, variables) {
                return payload.gamePlayers.gameId === variables.gameId;
            })
        }
    }
};
exports["default"] = resolvers;
