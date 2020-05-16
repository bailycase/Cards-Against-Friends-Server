import MongoClient from 'mongodb';
import config from '../../config';

export default () => new Promise((resolve, reject) => {
  MongoClient.connect(config.mongo.url, config.mongo.options, (err, db) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(db);
  });
});

