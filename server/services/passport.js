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
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 

     async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id})
    
        if (existingUser){
        
        return done(null, existingUser);
        }

       
        const user = await new User({googleId: profile.id}).save()
        done(null, user);
        }
    
) 
);