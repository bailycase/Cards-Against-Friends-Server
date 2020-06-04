"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    _id: ID!\n    email: String!\n    name: String\n  }\n  type RegisterResponse {\n    error: String!\n    user: User!\n  }\n  type LoginResponse {\n    error: String\n    user: User!\n  }\n  input UpdateUserArgs {\n    _id: ID!\n    name: String\n  } \n  type Query {\n    user: User\n    getCurrentGame(name: String!): Game\n  }\n  type Mutation {\n    registerUser(email: String!, password: String!): RegisterResponse\n    loginUser(email: String!, password: String!): LoginResponse\n    updateUser(args: UpdateUserArgs!): User!\n  }\n"], ["\n  type User {\n    _id: ID!\n    email: String!\n    name: String\n  }\n  type RegisterResponse {\n    error: String!\n    user: User!\n  }\n  type LoginResponse {\n    error: String\n    user: User!\n  }\n  input UpdateUserArgs {\n    _id: ID!\n    name: String\n  } \n  type Query {\n    user: User\n    getCurrentGame(name: String!): Game\n  }\n  type Mutation {\n    registerUser(email: String!, password: String!): RegisterResponse\n    loginUser(email: String!, password: String!): LoginResponse\n    updateUser(args: UpdateUserArgs!): User!\n  }\n"])));
exports["default"] = typeDefs;
var templateObject_1;
