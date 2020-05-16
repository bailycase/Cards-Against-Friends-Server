import setupMongoClient from './setupMongo';

let connection: any
const getDb = async () => {
  if (!connection) {
    connection = await setupMongoClient();
  }
  return connection.db('CAH');
};
export default getDb;
