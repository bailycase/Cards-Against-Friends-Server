import { GraphQLModule } from '@graphql-modules/core';
import userTypeDefs from './typeDefs';
import userResolvers from './resolvers';

export const userModule = new GraphQLModule({
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
  context: (session) => ({
    pubsub: session.pubsub,
    redis: session.redis,
    mongo: session.mongo,
  }),
});


