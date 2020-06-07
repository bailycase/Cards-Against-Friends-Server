import { ApolloServer } from "apollo-server-express";
import fs from 'fs'
import "reflect-metadata";
import https from "https";
import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { cardsModule } from "./src/cards/index";
import { userModule } from "./src/users/index";
import { gameModule } from "./src/game/index";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import express from "express";
import getDb from "./src/utils/getDb";
import { buildView } from './viewBuilder'
import { redisConfig } from './config'

const typeDefs = mergeTypes([
  cardsModule.typeDefs,
  userModule.typeDefs,
  gameModule.typeDefs,
]);
const resolvers = mergeResolvers([
  cardsModule.resolvers,
  userModule.resolvers,
  gameModule.resolvers,
]);



const redis = new Redis(redisConfig);
const pubsub = new RedisPubSub({
  publisher: new Redis(redisConfig),
  subscriber: new Redis(redisConfig),
});
const port = 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub: pubsub, redis: redis, mongo: getDb }),
  subscriptions: { path: '/subscriptions' }
});
const app = express();

server.applyMiddleware({ app });

const key = fs.readFileSync('./ssl/caf.key')
const cert = fs.readFileSync('./ssl/caf.cert')
const httpServer = https.createServer(
  {
    key,
    cert
  },
  app
)
server.installSubscriptionHandlers(httpServer);
httpServer.listen(port, () => {
  buildView();
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  );
});
