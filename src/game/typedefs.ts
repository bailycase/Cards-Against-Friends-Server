import { gql } from 'apollo-server';

const typeDefs = gql`
  type Game {
    gameId: String
    userJoined: UserJoin
    userLeft: UserLeft
    host: String
    users: [GameUsers]
  }
  type GamePlayers {
    gameId: String!
    event: String!
    host: String
    userJoined: UserJoin
    userLeft: UserLeft
    user: String
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
    card: String!
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

export default typeDefs;
