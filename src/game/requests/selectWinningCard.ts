import { MutationSelectWinningCardArgs } from '../../../__generated__/resolver-types'

const selectWinningCard = async (
    args: MutationSelectWinningCardArgs,
    pubsub: any,
    mongo: any
) => {
    const { name, gameId, winningUser } = args
    const db = await mongo()
    const gameCollection = db.collection("game")
    const cardCollection = db.collection("card-sets");
    // Check if the user requesting is the cardCzar
    const currentGame = await gameCollection.findOne(
        { gameId, "cardCzar": name },
    )

    // const nextCardCzar = currentGame.users.filter((user: any) => user.name !== currentGame.cardCzar)
    const clearSelectedCardsAgg = [
        {
            $set: {
                "users.cardSelected": null
            }
        }
    ]
    // Give the winning player a point and change the black card
    if (currentGame && currentGame.cardCzar === name) {
        const randomInt = (limiter: number) => Math.floor(Math.random() * limiter);
        const numberOfCardsets = await cardCollection.countDocuments();
        const deck = await cardCollection
            .find()
            .limit(1)
            .skip(randomInt(numberOfCardsets))
            .next();
        const blackCard = deck.blackCards[randomInt(deck.blackCards.length)].text;
        await gameCollection.findOneAndUpdate(
            { gameId, "users.name": winningUser, cardCzar: name },
            { $inc: { "users.$.points": 1 }, $set: { cardCzar: winningUser, blackCard }, },
            { returnOriginal: false }
        )
        const updatedGame = await gameCollection.findOneAndUpdate({ gameId }, clearSelectedCardsAgg)
        // Broadcast the new game data
        pubsub.publish(`${gameId}_PLAYERS`, {
            gamePlayers: {
                event: "USER_WIN_ROUND",
                gameId,
                users: updatedGame.value.users,
            },
        })
        pubsub.publish(`${gameId}_DETAILS`, {
            gameDetails: {
                event: "ROUND_UPDATE",
                gameId,
                roundStatus: "PICKING_CARDS",
                running: true,
                cardCzar: updatedGame.value.cardCzar,
            },
        });
        return true
    }


    return false
}

export default selectWinningCard