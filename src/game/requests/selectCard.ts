import { MutationSelectCardArgs, GamePlayer } from "../../../__generated__/resolver-types";

const selectCard = async (
  args: MutationSelectCardArgs,
  pubsub: any,
  mongo: any
) => {
  const { gameId, name, card } = args;
  const db = await mongo();
  const gameCollection = db.collection("game");

  const currentGame = await gameCollection.findOneAndUpdate(
    { gameId, "users.name": name },
    { $set: { "users.$.cardSelected": card } },
    { returnOriginal: false }
  )
  const { cardCzar } = currentGame.value

  // Check if all the users have selected a card, except the cardCzar
  const allSelected = currentGame.value.users.filter((user: GamePlayer) => user.name !== cardCzar).map((user: GamePlayer) => {
    if (user.cardSelected) return true
    return false
  })
  // Broadcast that a player has selected a card
  pubsub.publish(`${gameId}_PLAYERS`, {
    gamePlayers: {
      event: "USER_SELECT_CARD",
      gameId,
      user: name,
    },
  });

  // If all users have selected a card, push the game to the judging round
  if (!allSelected.includes(false)) {
    const usersCards = currentGame.value.users.filter((user: GamePlayer) => user.name !== cardCzar).map((user: GamePlayer) => {
      return { name: user.name, card: user.cardSelected }
    })
    console.log(usersCards)
    pubsub.publish(`${gameId}_DETAILS`, {
      gameDetails: {
        event: "ROUND_UPDATE",
        gameId,
        roundStatus: "JUDGING_ROUND",
        running: true,
        cardCzar,
        cardsToJudge: usersCards
      },
    });
  }
  return true;
};
export default selectCard;
