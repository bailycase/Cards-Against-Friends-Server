import { gql } from 'apollo-server';

const typeDefs = gql`
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

export default typeDefs;
