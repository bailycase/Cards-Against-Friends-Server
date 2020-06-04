"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var config_1 = require("../../config");
exports["default"] = (function () { return new Promise(function (resolve, reject) {
    mongodb_1["default"].connect(config_1["default"].mongo.url, config_1["default"].mongo.options, function (err, db) {
        if (err) {
            reject(err);
            return;
        }
        resolve(db);
    });
}); });
