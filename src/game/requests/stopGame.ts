import { ApolloError } from "apollo-server";

const stopGame = async (args: any, pubsub: any, mongo: any) => {
  const { gameId, name } = args;
  const db = await mongo();
  const gameCollection = db.collection("game");
  const gameAgg = [
    {
      $set: {
        running: {
          $cond: [
            {
              $eq: ["$host", name],
            },
            false,
            true,
          ],
        },
        "users.cardSelected": null
      },
    },
  ];
  const game = await gameCollection.findOneAndUpdate({ gameId }, gameAgg, {
    returnOriginal: true,
  });
  if (game.value.running === false) {
    return new ApolloError("Your game is not running");
  }
  const updatedGame = await gameCollection.findOne({ _id: game.value._id });
  const { cardCzar, running, gameId: id } = updatedGame;
  pubsub.publish(`${gameId}_DETAILS`, {
    gameDetails: {
      gameId: id,
      event: "GAME_STOPPED",
      roundStatus: "STOPPED",
      running,
      cardCzar,
    },
  });
  return updatedGame;
};

export default stopGame;
