import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../model/account';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

const account = ({ config, db }) => {
  let api = Router();

  api.post('/signup', (req, res) => {
    Account.register(new Account({
      email: req.body.email,
      username: req.body.username,
    }), req.body.password, function(err, account) {
      if (err) {
        console.log('\x1b[31mUnable to register account\x1b[0m', err)
        console.log('\x1b[33mEmail\x1b[0m', req.body.email)
        console.log('\x1b[33mUsername\x1b[0m', req.body.username)
        console.log('\x1b[33mPassword\x1b[0m', req.body.password)

        res.send(err);
      }
      passport.authenticate('local', {
        session: false
      })(req, res, () => {
        res.status(200).send('Successfully created new account');
      });
    });
  });

  api.post('/login', passport.authenticate('local', {
    session: false,
    scope: []
  }), generateAccessToken, respond);

  api.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).send('Successfully logged out');
  });

  return api;
}

export default account;