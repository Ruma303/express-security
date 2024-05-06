const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

require('dotenv').config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//# Google Strategy
passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/google-auth-redirect',
        responseType: 'code',
    },
    async (accessToken, refreshToken, tokenID, done) => {
        console.log(tokenID) //? Debug

        try {
            const email = tokenID.emails[0].value;
            let user = await User.findOne({ email: email });

            if (!user) {
                const hashedPassword = await bcrypt.hash('password', 10);
                user = new User({
                    username: email,
                    email: email,
                    password: hashedPassword,
                });
                console.log(user);
                await user.save();
                return done(null, user);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));


//# Local Strategy
passport.use('local-login', new LocalStrategy({ passReqToCallback: true },
    async (req, username, password, done) => {
        try {
            console.log('Username: ', username, '\nPassword: ', password) //? Debug
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: req.flash('userNotFound', `*Utente ${username} non trovato`) });
            }
            const isMatch = await user.verifyPassword(password);
            if (!isMatch) {
                return done(null, false, { message: req.flash('incorrectPassword', '*Password non corretta') });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));



//# Serializzazione e Deserializzazione
passport.serializeUser((user, done) => {
    done(null, user._id);
    console.log('ID serializzato', user._id)
});

passport.deserializeUser(async (_id, done) => {
    try {
        const user = await User.findById(_id);
        done(null, user);
        console.log('ID deserializzato', user._id);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
