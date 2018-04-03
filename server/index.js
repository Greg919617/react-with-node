const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('../config/keys');
require('../models/User');
require('../services/passport');


//^^^order of require statement can result in error
//model must be declared first
//instruct attempt to connect to theat copy of mongo db that we provisioned

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

//returns a function,
//second set of () immediately calls the function we just required in
//the app is passed into the arrow function
//we attached the 2 route handlers, & the app is all happy because it got its 2 routes.

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);