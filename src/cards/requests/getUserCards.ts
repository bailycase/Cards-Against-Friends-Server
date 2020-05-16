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

const getUserCards = async (args: any, pubsub: any, mongo: any) => {
  const { gameId, name } = args;
  const db = await mongo();
  const gameCollection = db.collection("game");

  const currentGame = await gameCollection.findOne({ gameId });
  const {  blackCard } = currentGame;

  // Logic related to giving out cards
  const cardCollection = db.collection("card-sets");
  const numberOfCardsets = await cardCollection.countDocuments();

  //if (name === cardCzar) return;
  const randomInt = Math.floor(Math.random() * numberOfCardsets);
  const deck = await cardCollection.find().limit(1).skip(randomInt).next();
  const cards = getRandom(deck.whiteCards, 5);
  pubsub.publish(`${gameId}_DETAILS_CARDS`, {
    cardsDealt: {
      blackCard,
      user: name,
      cards,
    },
  });
  return {
    user: name,
    blackCard,
    cards,
  };
};

export default getUserCards;
