import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

//  TODO: add regex patterns
let Account = new Schema({
  email: {  //  TODO: regex pattern
    type: String,
    required: true
  },
  username: {  // TODO: max and min characters
    type: String,
    required: true
  },
  password: String  //  TODO: max, min and password strength 
});

Account.plugin(passportLocalMongoose);

export default mongoose.model('Account', Account);
