import { ApolloError } from "apollo-server";

const joinGame = async (args: any, pubsub: any, mongo: any) => {
  const { gameId, name } = args;
  // Mongo
  const db = await mongo();
  const gameCollection = db.collection("game");

  //const userInGame = await gameCollection.findOne({
  //gameId,
  //users: name,
  //});

  //if (userInGame) return await gameCollection.findOne({
  //gameId
  //})
  // rewrite to aggregation
  const userCollection = db.collection("users");
  await userCollection.findOneAndUpdate(
    { name },
    { $set: { currentGame: gameId } }
  );
  const data = await gameCollection.findOneAndUpdate(
    { gameId },
    { $push: { users: { name: name, points: 0 } } }
  );
  if (!data.value)
    return new ApolloError("There was an error joining the game");

  const { host } = data.value;
  pubsub.publish(`${gameId}_PLAYERS`, {
    gamePlayers: {
      event: "USER_JOIN",
      gameId,
      host,
      userJoined: {
        name,
      },
    },
  });
  return data.value;
};

export default joinGame;
