import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let announcementSchema = new Schema({
  content: String
});

module.exports = mongoose.model('Announcement', announcementSchema);
