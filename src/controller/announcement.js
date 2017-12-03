import mongoose from 'mongoose';
import { Router } from 'express';
import Announcement from '../model/announcement';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();

  //  View All  -  /v1/announcement
  api.get('/', (req, res) => {
    console.log('\x1b[36mThe call was made\x1b[0m');
    Announcement.find({}, (err, announcements) => {
      if (err) {
        console.log('\x1b[31mERROR:\x1b[0m', err);
        res.send(err);
      }
      console.log('\x1b[34mSUCCESS:\x1b[0m', announcements);
      res.json(announcements);
    });
  });

  //  Add Announcement  -  /v1/announcement/add
  api.post('/add', (req, res) => {
    console.log('\x1b[36mThe post call was made\x1b[0m');

    let newAnnouncement = new Announcement();
    newAnnouncement.content = req.body.content;

    newAnnouncement.save(err => {
      if (err) {
        console.log('\x1b[31mERROR:\x1b[0m', err);
        res.send(err);
      }
      console.log('\x1b[34mSUCCESS:\x1b[0m');
      res.json({ message: 'Announcement saved successfully' });
    });
  });

  return api;
}
