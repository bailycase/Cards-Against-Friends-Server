"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  type BlackCards {
    pick: Int
    text: String
  }
  type cardSet {
    setName: String
    blackCards: [BlackCards]
    whiteCards: [String]
  }
  type UserCards {
    user: String!
    blackCard: String!
    cards: [String]!
  }
  type Query {
    cardSets: [cardSet]
    cardSet(setName: String!): cardSet
    getUserCards(gameId: String!, name: String!): UserCards!
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map