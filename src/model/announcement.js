import mongoose, { Schema } from 'mongoose';

let announcementSchema = new Schema({
  content: String
});

export default mongoose.model('Announcement', announcementSchema);
