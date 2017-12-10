import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';

import configDb from './config';
import routes from './routes';

const LocalStrategy = require('passport-local').Strategy;

let app = express();
app.server = http.createServer(app);

//  middleware
//  TODO: Properlly configure so it only allows access from vs domain
app.use (cors({credentials: true, origin: true}));
app.use(bodyParser.json({ limit: configDb.bodyLimit }));

//  passport config
app.use(passport.initialize());
let Account = require('./model/account');

passport.use(new LocalStrategy({
  emailField: 'email',
  usernameField: 'username',
  passwordField: 'password'
}, Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


//  api routes v1
app.use('/', routes);

app.server.listen(configDb.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
