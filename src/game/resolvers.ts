import { withFilter } from "apollo-server";
import { MutationCreateGameArgs } from "../../__generated__/resolver-types";
import createGame from "./requests/createGame";
import joinGame from "./requests/joinGame";
import leaveGame from "./requests/leaveGame";
import getGame from "./requests/getGame";
import startGame from "./requests/startGame";
import stopGame from "./requests/stopGame";
import selectCard from './requests/selectCard'

const resolvers = {
  Query: {
    getGame: (_: any, args: any, { mongo }: any) => getGame(args, mongo),
  },
  Mutation: {
    createGame: (
      _: void,
      args: MutationCreateGameArgs,
      { pubsub, mongo }: any
    ): any => createGame(args, pubsub, mongo),
    joinGame: (_: void, args: any, { pubsub, mongo }: any): any =>
      joinGame(args, pubsub, mongo),
    leaveGame: (_: void, args: any, { pubsub, mongo }: any): any =>
      leaveGame(args, pubsub, mongo),
    startGame: (_: void, args: any, { pubsub, mongo }: any): any =>
      startGame(args, pubsub, mongo),
    stopGame: (_: void, args: any, { pubsub, mongo }: any) =>
      stopGame(args, pubsub, mongo),
      selectCard: (_: void, args: any, {pubsub, mongo}: any) => selectCard(args, pubsub, mongo)
  },
  Subscription: {
    game: {
      subscribe: withFilter(
        (_: any, args: any, { pubsub }: any) => {
          return pubsub.asyncIterator(`${args.gameId}_GAME`);
        },
        (payload, variables) => {
          return payload.game.gameId === variables.gameId;
        }
      ),
    },
    gameDetails: {
      subscribe: withFilter(
        (_: any, args: any, { pubsub }: any) => {
          return pubsub.asyncIterator(`${args.gameId}_DETAILS`);
        },
        (payload, variables) => {
          return payload.gameDetails.gameId === variables.gameId;
        }
      ),
    },
    cardsDealt: {
      subscribe: withFilter(
        (_: any, args: any, { pubsub }: any) => {
          return pubsub.asyncIterator(`${args.gameId}_DETAILS_CARDS`);
        },
        (payload, variables) => {
          return payload.cardsDealt.gameId === variables.gameId;
        }
      ),
    },
    gamePlayers: {
      subscribe: withFilter(
        (_: any, args: any, { pubsub }: any) => {
          return pubsub.asyncIterator(`${args.gameId}_PLAYERS`);
        },
        (payload, variables) => {
          return payload.gamePlayers.gameId === variables.gameId;
        }
      ),
    },
  },
};

export default resolvers;
