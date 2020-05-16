import { ApolloError } from "apollo-server";
const leaveGame = async (args: any, pubsub: any, mongo: any) => {
  const { gameId, name } = args;
  // Mongo
  const db = await mongo();
  const gameCollection = db.collection("game");

  const usersCurrentGame = await gameCollection.findOne({
    gameId,
    users: { $elemMatch: { name } },
  });
  if (!usersCurrentGame)
    return new ApolloError("You are not currently in a game");
  const { users, host, _id } = usersCurrentGame;
  // If the user trying to leave is the last one in the game
  if (users.length === 1) {
    await gameCollection.findOneAndDelete({ _id });
    return true;
  }
  // If the current user leaving is the host
  let newHost;
  if (host === name) {
    const nextHost = () => {
      return users.filter((user: any) => user.name !== name)[0];
    };
    newHost = nextHost();
    await gameCollection.findOneAndUpdate(
      { _id },
      { $set: { host: newHost.name } }
    );
  }
  const data = await gameCollection.findOneAndUpdate(
    { _id },
    { $pull: { users: { name: name } } }
  );
  if (!data.value)
    return new ApolloError("There was an error leaving the game");
  if (!newHost) newHost = host;
  pubsub.publish(`${gameId}_PLAYERS`, {
    gamePlayers: {
      event: "USER_LEAVE",
      gameId,
      userLeft: {
        name,
      },
      host: newHost,
    },
  });
  return true;
};
export default leaveGame;
