import express from 'express';
import configDb from '../config';
import middleware from '../middleware';
import initializeDb from '../db';

import announcement from '../controller/announcement';
import account from '../controller/account';

let router = express();

//  connect to db
initializeDb(db => {

  //  internal middleware
  router.use(middleware({ configDb, db }));

  //  api routes v1
  router.use('/announcement', announcement({ configDb, db }));
  router.use('/account', account({ configDb, db }))
})

export default router;
