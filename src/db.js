import mongoose from 'mongoose';
import config from './config';

export default callback => {
  let db = mongoose.connect(config.mongoUrl, {
    //  pass through options to avoid deprecated open() waring
    useMongoClient: true,
    promiseLibrary: global.Promise
  });
  callback(db);
}
