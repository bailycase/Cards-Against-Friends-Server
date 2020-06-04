"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  type User {
    _id: ID!
    email: String!
    name: String
  }
  type RegisterResponse {
    error: String!
    user: User!
  }
  type LoginResponse {
    error: String
    user: User!
  }
  input UpdateUserArgs {
    _id: ID!
    name: String
  } 
  type Query {
    user: User
    getCurrentGame(name: String!): Game
  }
  type Mutation {
    registerUser(email: String!, password: String!): RegisterResponse
    loginUser(email: String!, password: String!): LoginResponse
    updateUser(args: UpdateUserArgs!): User!
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map