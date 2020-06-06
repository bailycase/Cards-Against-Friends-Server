import MongoClient from 'mongodb';
import { mongoConfig } from '../../config';

export default () => new Promise((resolve, reject) => {
  MongoClient.connect(mongoConfig.url, mongoConfig.options, (err, db) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(db);
  });
});

