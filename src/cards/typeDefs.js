"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type BlackCards {\n    pick: Int\n    text: String\n  }\n  type cardSet {\n    setName: String\n    blackCards: [BlackCards]\n    whiteCards: [String]\n  }\n  type UserCards {\n    user: String!\n    blackCard: String!\n    cards: [String]!\n  }\n  type Query {\n    cardSets: [cardSet]\n    cardSet(setName: String!): cardSet\n    getUserCards(gameId: String!, name: String!): UserCards!\n  }\n"], ["\n  type BlackCards {\n    pick: Int\n    text: String\n  }\n  type cardSet {\n    setName: String\n    blackCards: [BlackCards]\n    whiteCards: [String]\n  }\n  type UserCards {\n    user: String!\n    blackCard: String!\n    cards: [String]!\n  }\n  type Query {\n    cardSets: [cardSet]\n    cardSet(setName: String!): cardSet\n    getUserCards(gameId: String!, name: String!): UserCards!\n  }\n"])));
exports["default"] = typeDefs;
var templateObject_1;
