"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var bcrypt_1 = require("bcrypt");
var getDb_1 = require("../utils/getDb");
var updateUser_1 = require("./requests/updateUser");
var getCollection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getDb_1["default"]()];
            case 1:
                db = _a.sent();
                return [2 /*return*/, db.collection('users')];
        }
    });
}); };
var registerUser = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var collection, salt, doesUserExist, ops;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getCollection()];
                case 1:
                    collection = _b.sent();
                    salt = bcrypt_1["default"].hashSync(password, 10);
                    return [4 /*yield*/, collection.findOne({ email: email })];
                case 2:
                    doesUserExist = !!(_b.sent());
                    if (doesUserExist) {
                        return [2 /*return*/, new Error('There is already an account with that email registered')];
                    }
                    return [4 /*yield*/, collection.insertOne({
                            email: email,
                            salt: salt
                        })];
                case 3:
                    ops = (_b.sent()).ops;
                    return [2 /*return*/, {
                            user: __assign({}, ops[0])
                        }];
            }
        });
    });
};
var loginUser = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var collection, user, isAuthed;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getCollection()];
                case 1:
                    collection = _b.sent();
                    return [4 /*yield*/, collection.findOne({ email: email })];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, new Error("We can't find an account with that email")];
                    }
                    isAuthed = bcrypt_1["default"].compareSync(password, user.salt);
                    if (!isAuthed) {
                        return [2 /*return*/, new Error("That isn't the correct password")];
                    }
                    console.log(user);
                    if (isAuthed) {
                        return [2 /*return*/, { user: user }];
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var getCurrentGame = function (_a) {
    var name = _a.name;
    return __awaiter(void 0, void 0, void 0, function () {
        var collection, User;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getCollection()];
                case 1:
                    collection = _b.sent();
                    return [4 /*yield*/, collection.findOne({
                            name: name
                        })];
                case 2:
                    User = _b.sent();
                    return [2 /*return*/, User];
            }
        });
    });
};
var resolvers = {
    Query: {
        // user: (_, args) => getUser(args),
        getCurrentGame: function (_, args) { return getCurrentGame(args); }
    },
    Mutation: {
        loginUser: function (_, args) { return loginUser(args); },
        registerUser: function (_, args) { return registerUser(args); },
        updateUser: function (_, args, _a) {
            var mongo = _a.mongo;
            return updateUser_1["default"](__assign({}, args), mongo);
        }
    }
};
exports["default"] = resolvers;
