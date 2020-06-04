"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  type Game {
    gameId: String
    userJoined: UserJoin
    userLeft: UserLeft
    host: String
    users: [GameUsers!]!
  }
  type GamePlayers {
    gameId: String!
    event: String!
    host: String
    userJoined: UserJoin
    userLeft: UserLeft
    user: String
    users: [GamePlayer]
  }
  type GameUsers {
    host: String!
    name: String!
    points: String
  }
  type GamePlayer {
    name: String!
    points: Int!
    cardSelected: Boolean
  }
  type Mutation {
    createGame(gameId: String!, host: String!): Game
    joinGame(gameId: String!, name: String!): Game
    leaveGame(gameId: String!, name: String!): Boolean!
    startGame(gameId: String!, name: String!): GameDetails
    stopGame(gameId: String!, name: String!): GameDetails
    selectCard(gameId: String!, name: String!, card: String!): Boolean!
    selectWinningCard(gameId: String!, name: String!, card: String!, winningUser: String!): Boolean!
  }
  type UserJoin {
    name: String
  }
  type UserLeft {
    name: String
  }
  type Query {
    getGame(gameId: String!, name: String!): Game
  }
  type CardsToJudge {
    name: String!
    cardName: String!
  }
  type GameDetails {
    gameId: String!
    event: String!
    blackCard: String!
    running: Boolean
    roundStatus: String
    cardCzar: String
    cardsToJudge: [CardsToJudge]
  }
  type CardsDealt {
    gameId: String
    blackCard: String!
    user: String
    cards: [String]
  }
  type Subscription {
    game(gameId: String!): Game
    gameDetails(gameId: String!): GameDetails
    gamePlayers(gameId: String!): GamePlayers
    cardsDealt(gameId: String!): CardsDealt
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map