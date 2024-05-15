const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

//# Definizione Local Strategy
/* passport.use('local-login', new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Username: ', username, '\nPassword: ', password) //? Debug
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false);
        }
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
})); */

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
