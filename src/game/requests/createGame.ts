import {ApolloError} from 'apollo-server'
import {MutationCreateGameArgs} from '../../../__generated__/resolver-types'
const createGame = async (
  args: MutationCreateGameArgs,
  pubsub: any,
  mongo: any
) => {
  const { gameId, host } = args;
  // Mongo
  const db = await mongo();
  const gameCollection = db.collection("game");
  const hasAGame = await gameCollection.findOne({ host });
  if (hasAGame) return new ApolloError("You already have a game created");
  try {
    await gameCollection.insertOne({ gameId, host });
    pubsub.publish('GAME_CREATED', { gameName: `${gameId}_GAME` });
    pubsub.publish(`${gameId}_GAME`, { gameId });
  } catch {
    return new ApolloError("There was an error creating your game");
  }
  return { gameId };
};

export default createGame
