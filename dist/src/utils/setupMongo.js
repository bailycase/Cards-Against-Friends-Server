"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = __importDefault(require("mongodb"));
const config_1 = require("../../config");
exports.default = () => new Promise((resolve, reject) => {
    mongodb_1.default.connect(config_1.mongoConfig.url, config_1.mongoConfig.options, (err, db) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(db);
    });
});
//# sourceMappingURL=setupMongo.js.map