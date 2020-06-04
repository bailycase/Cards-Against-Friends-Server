"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = __importDefault(require("mongodb"));
const config_1 = __importDefault(require("../../config"));
exports.default = () => new Promise((resolve, reject) => {
    mongodb_1.default.connect(config_1.default.mongo.url, config_1.default.mongo.options, (err, db) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(db);
    });
});
//# sourceMappingURL=setupMongo.js.map