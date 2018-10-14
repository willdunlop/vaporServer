import mongoose from 'mongoose';
import { Router } from 'express';
import Announcement from '../model/announcement';
import bodyParser from 'body-parser';

const announcement = ({ config, db }) => {
  let api = Router();
  console.log('\x1b[36mHi from announcements\x1b[0m');

  //  View All  -  /v1/announcement
  api.get('/', (req, res) => {
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


export default announcement;