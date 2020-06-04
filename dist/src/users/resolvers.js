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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const getDb_1 = __importDefault(require("../utils/getDb"));
const updateUser_1 = __importDefault(require("./requests/updateUser"));
const getCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield getDb_1.default();
    return db.collection('users');
});
const registerUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getCollection();
    const salt = bcrypt_1.default.hashSync(password, 10);
    const doesUserExist = !!(yield collection.findOne({ email }));
    if (doesUserExist) {
        return new Error('There is already an account with that email registered');
    }
    const { ops } = yield collection.insertOne({
        email,
        salt,
    });
    return {
        user: Object.assign({}, ops[0]),
    };
});
const loginUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getCollection();
    const user = yield collection.findOne({ email });
    if (!user) {
        return new Error("We can't find an account with that email");
    }
    const isAuthed = bcrypt_1.default.compareSync(password, user.salt);
    if (!isAuthed) {
        return new Error("That isn't the correct password");
    }
    console.log(user);
    if (isAuthed) {
        return { user };
    }
});
const getCurrentGame = ({ name }) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getCollection();
    const User = yield collection.findOne({
        name,
    });
    return User;
});
const resolvers = {
    Query: {
        // user: (_, args) => getUser(args),
        getCurrentGame: (_, args) => getCurrentGame(args),
    },
    Mutation: {
        loginUser: (_, args) => loginUser(args),
        registerUser: (_, args) => registerUser(args),
        updateUser: (_, args, { mongo }) => updateUser_1.default(Object.assign({}, args), mongo),
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map