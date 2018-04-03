const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//1 argument means we are trying to fetch
//2 means we are trying to load something into it
//model class to create a new instance and persist it to the database

const User = mongoose.model('users');


//user pulled from database

passport.serializeUser((user, done) => {
    done(null, user.id);
});

//passport is a helper for handling authentication
passport.deserializeUser((id, done) => {
   User.findById(id)
   .then(user => {
    done(null, user);
   });
});

passport.use(
    new GoogleStrategy(
    {                            //argument 1
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, 
//google profile contains the unique id or token that we want to save into user record
    (accessToken, refreshToken, profile, done) => {                           //argument 2
       
//initiate a query or search over all records inside collection
    User.findOne({googleId: profile.id})
        .then((existingUser) => {
            if (existingUser){
                //we already have a record with given profile Id
                done(null, existingUser);
            }else{
                //we dont have a user with this ID, make a new record
                new User({googleId: profile.id})
                    .save()
                    .then(user => done(null, user));
            }
        });
    }
) 
);
//***passport callbacks video ***
//using promise for asynchronous code
//creates a record, 
//still needs to be persisted or saved
//must call .save() function to put in db.
