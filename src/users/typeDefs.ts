import { gql } from 'apollo-server';

const typeDefs = gql`
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

export default typeDefs;
