"use strict";
// gets all cards and their sets and stores them to a table with the DB 'CAH'
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
const node_fetch_1 = __importDefault(require("node-fetch"));
const getDb_1 = __importDefault(require("./src/utils/getDb"));
const buildView = () => __awaiter(void 0, void 0, void 0, function* () {
    const rootUrl = 'https://cards-against-humanity-api.herokuapp.com';
    const db = yield getDb_1.default();
    let setNames = [];
    const cardSets = [];
    const buildSetNamesCollection = () => __awaiter(void 0, void 0, void 0, function* () {
        const cardSetNamesCollection = db.collection('card-set-names');
        const setCount = yield cardSetNamesCollection.countDocuments();
        setNames = yield node_fetch_1.default(`${rootUrl}/sets`).then((res) => res.json());
        if (setNames.length > setCount) {
            setNames.map((set) => {
                cardSetNamesCollection.insertOne(set);
            });
        }
    });
    const buildCardSetsCollection = () => __awaiter(void 0, void 0, void 0, function* () {
        const cardSetCollection = db.collection('card-sets');
        const cardSetCount = yield cardSetCollection.countDocuments();
        if (setNames.length > cardSetCount) {
            setNames.forEach(({ setName }) => __awaiter(void 0, void 0, void 0, function* () {
                const set = yield node_fetch_1.default(`${rootUrl}/sets/${setName}`).then((res) => res.json());
                cardSetCollection.insertOne(set);
            }));
        }
    });
    yield buildSetNamesCollection();
    yield buildCardSetsCollection();
});
exports.buildView = buildView;
//# sourceMappingURL=viewBuilder.js.map