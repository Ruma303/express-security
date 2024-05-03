const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');


//# Definizione Local Strategy
passport.use('local-login', new LocalStrategy(async (username, password, done) => {
    try {
        console.log(username, password) // { admin, password }
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Utente non trovato' });
        }
        /* if (!user.verifyPassword(password)) {
            return done(null, false, { message: 'Password non corretta' });
        } */
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

//# Serializzazione e Deserializzazione
passport.serializeUser((user, done) => {
    done(null, user.id);
    console.log('serializzato', user.id)
});

passport.deserializeUser((id, done) => {
    const user = User.findById(id)
    if(!id) (err, user) => done(err, user)
    console.log('deserializzato', id)
    done(null, user)
});


module.exports = passport;
