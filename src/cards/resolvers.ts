import getDb from '../utils/getDb';
import getUserCards from './requests/getUserCards'

const getCollection = async () => {
  const db = await getDb();
  return db.collection('card-sets');
};
const getCardSets = async () => {
  const collection = await getCollection();
  const results = await collection.find();
  return results.toArray();
};
const getCardSet = async ({ setName }: any): Promise<any> => {
  const collection = await getCollection();
  const results = await collection.findOne({ setName });
  return results;
};
const resolvers = {
  Query: {
    cardSets: () => getCardSets(),
    cardSet: (_: any, args: any) => getCardSet(args),
    getUserCards: (_: any, args: any, {pubsub, mongo}: any): any => getUserCards(args, pubsub, mongo)
  },
};

export default resolvers;
