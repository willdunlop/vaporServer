import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import announcement from '../controller/announcement';

let router = express();

//  connect to db
initializeDb(db => {

  //  internal middleware
  router.use(middleware({ config, db }));

  //  api routes v1
  router.use('/announcement', announcement({ config, db }));
})

export default router;
