import mongoose from 'mongoose';
import bluebird from 'bluebird';

import configDb from './config';

export default callback => {
  mongoose.Promise = bluebird;
  let db = mongoose.connect(configDb.mongoUrl, {
    //  pass through options to avoid deprecated open() waring
    useMongoClient: true,
    promiseLibrary: global.Promise
  });
  callback(db);
}
