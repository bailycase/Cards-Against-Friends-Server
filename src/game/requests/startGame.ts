import { ApolloError } from "apollo-server";
function getRandom(arr: Array<any>, n: number) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
const startGame = async (args: any, pubsub: any, mongo: any) => {
  const { gameId, name } = args;
  const db = await mongo();
  const gameCollection = db.collection("game");
  const gameAgg = [
    {
      $set: {
        cardCzar: "$host",
        running: {
          $cond: [
            {
              $eq: ["$host", name],
            },
            true,
            false,
          ],
        },
      },
    },
  ];
  const game = await gameCollection.findOneAndUpdate({ gameId }, gameAgg, {
    returnOriginal: true,
  });
  if (game.value.host !== name) {
    return new ApolloError("Only the host can start the game!");
  }
  if (game.value.running === true) {
    return new ApolloError("The game is already running");
  }
  const updatedGame = await gameCollection.findOne({ gameId });
  const { cardCzar, running, gameId: id, users, _id } = updatedGame;

  pubsub.publish(`${gameId}_DETAILS`, {
    gameDetails: {
      gameId: id,
      event: "GAME_STARTED",
      roundStatus: 'PICKING_CARDS',
      running,
      cardCzar,
    },
  });

  // Logic related to giving out cards
  const cardCollection = db.collection("card-sets");
  const numberOfCardsets = await cardCollection.countDocuments();
  let blackCard: any;
  users.forEach(async (user: any) => {
    //if (user.name === cardCzar) return;
    const randomInt = (limiter: number) => Math.floor(Math.random() * limiter);
    const deck = await cardCollection
      .find()
      .limit(1)
      .skip(randomInt(numberOfCardsets))
      .next();
    const cards = getRandom(deck.whiteCards, 5);
    if (!blackCard) {
      blackCard = deck.blackCards[randomInt(deck.blackCards.length)].text;
      await gameCollection.findOneAndUpdate(
        { _id },
        { $set: { blackCard: blackCard } },
        { returnOriginal: false }
      );
    }
    pubsub.publish(`${gameId}_DETAILS_CARDS`, {
      cardsDealt: {
        gameId: id,
        user: user.name,
        blackCard: blackCard,
        cards,
      },
    });
  });

  return updatedGame;
};

export default startGame;
