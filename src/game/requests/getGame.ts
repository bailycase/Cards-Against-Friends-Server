const getGame = async (args: any, mongo: any) => {
  const { gameId, name } = args;
  const db = await mongo();
  const gameCollection = db.collection("game");
  const game = await gameCollection.findOne({
    gameId,
    users: { $elemMatch: { name } },
  });
  if (!game) return;
  return game;
};
export default getGame;
