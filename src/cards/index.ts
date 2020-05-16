import { GraphQLModule } from '@graphql-modules/core';
import cardTypeDefs from './typeDefs';
import cardResolvers from './resolvers';

export const cardsModule = new GraphQLModule({
  typeDefs: cardTypeDefs,
  resolvers: cardResolvers,
  imports: [],
  context: session => {
    return {
      pubsub: session.pubsub,
      redis: session.redis,
      mongo: session.mongo
    };
  },
});


