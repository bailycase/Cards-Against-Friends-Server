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
const getDb_1 = __importDefault(require("../utils/getDb"));
const getUserCards_1 = __importDefault(require("./requests/getUserCards"));
const getCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield getDb_1.default();
    return db.collection('card-sets');
});
const getCardSets = () => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getCollection();
    const results = yield collection.find();
    return results.toArray();
});
const getCardSet = ({ setName }) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getCollection();
    const results = yield collection.findOne({ setName });
    return results;
});
const resolvers = {
    Query: {
        cardSets: () => getCardSets(),
        cardSet: (_, args) => getCardSet(args),
        getUserCards: (_, args, { pubsub, mongo }) => getUserCards_1.default(args, pubsub, mongo)
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map