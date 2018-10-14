import mongoose from 'mongoose';
import bluebird from 'bluebird';

import config from './config';

const initializeDb = callback => {
  mongoose.Promise = bluebird;
  let db = mongoose.connect(config.mongoUrl, {
    //  pass through options to avoid deprecated open() waring
    useMongoClient: true,
    promiseLibrary: global.Promise
  });
  callback(db);
}

export default initializeDb;