import { GraphQLModule } from '@graphql-modules/core';
import gameResolver from './resolvers';
import gameTypeDefs from './typedefs';
import { userModule } from '../users/index';

export const gameModule = new GraphQLModule({
  typeDefs: gameTypeDefs,
  resolvers: gameResolver,
  imports: [userModule],
  context: (session) => ({
    pubsub: session.pubsub,
    redis: session.redis,
    mongo: session.mongo,
  }),
});
