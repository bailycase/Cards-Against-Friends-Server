// gets all cards and their sets and stores them to a table with the DB 'CAH'

import fetch from 'node-fetch';
import config from './config';
import getDb from './src/utils/getDb';

const buildView = async () => {
  const rootUrl = 'https://cards-against-humanity-api.herokuapp.com';
  const db = await getDb();
  let setNames = [];
  const cardSets = [];
  const buildSetNamesCollection = async () => {
    const cardSetNamesCollection = db.collection('card-set-names');
    const setCount = await cardSetNamesCollection.countDocuments();
    setNames = await fetch(`${rootUrl}/sets`).then((res) => res.json());
    if (setNames.length > setCount) {
      setNames.map((set) => {
        cardSetNamesCollection.insertOne(set);
      });
    }
  };
  const buildCardSetsCollection = async () => {
    const cardSetCollection = db.collection('card-sets');
    const cardSetCount = await cardSetCollection.countDocuments();
    if (setNames.length > cardSetCount) {
      setNames.forEach(async ({ setName }) => {
        const set = await fetch(`${rootUrl}/sets/${setName}`).then((res) => res.json());
        cardSetCollection.insertOne(set);
      });
    }
  };
  await buildSetNamesCollection();
  await buildCardSetsCollection();
};
export { buildView };
