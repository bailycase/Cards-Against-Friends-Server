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
var leaveGame = function (args, pubsub, mongo) { return __awaiter(void 0, void 0, void 0, function () {
    var gameId, name, db, gameCollection, usersCurrentGame, users, host, _id, newHost, nextHost, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gameId = args.gameId, name = args.name;
                return [4 /*yield*/, mongo()];
            case 1:
                db = _a.sent();
                gameCollection = db.collection("game");
                return [4 /*yield*/, gameCollection.findOne({
                        gameId: gameId,
                        users: { $elemMatch: { name: name } }
                    })];
            case 2:
                usersCurrentGame = _a.sent();
                if (!usersCurrentGame)
                    return [2 /*return*/, new apollo_server_1.ApolloError("You are not currently in a game")];
                users = usersCurrentGame.users, host = usersCurrentGame.host, _id = usersCurrentGame._id;
                if (!(users.length === 1)) return [3 /*break*/, 4];
                return [4 /*yield*/, gameCollection.findOneAndDelete({ _id: _id })];
            case 3:
                _a.sent();
                return [2 /*return*/, true];
            case 4:
                if (!(host === name)) return [3 /*break*/, 6];
                nextHost = function () {
                    return users.filter(function (user) { return user.name !== name; })[0];
                };
                newHost = nextHost();
                return [4 /*yield*/, gameCollection.findOneAndUpdate({ _id: _id }, { $set: { host: newHost.name } })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, gameCollection.findOneAndUpdate({ _id: _id }, { $pull: { users: { name: name } } })];
            case 7:
                data = _a.sent();
                if (!data.value)
                    return [2 /*return*/, new apollo_server_1.ApolloError("There was an error leaving the game")];
                if (!newHost)
                    newHost = host;
                pubsub.publish(gameId + "_PLAYERS", {
                    gamePlayers: {
                        event: "USER_LEAVE",
                        gameId: gameId,
                        userLeft: {
                            name: name
                        },
                        host: newHost
                    }
                });
                return [2 /*return*/, true];
        }
    });
}); };
exports["default"] = leaveGame;
