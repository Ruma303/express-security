const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use('local-login', new LocalStrategy(async (username, password, done) => {
    try {
        // Cerca l'utente nel database
        const user = await User.findOne({ username: username });

        // Se l'utente non esiste, restituisci un messaggio di errore
        if (!user) {
            return done(null, false, { message: 'Utente non trovato' });
        }

        // Verifica che la password sia corretta
        if (!user.verifyPassword(password)) {
            return done(null, false, { message: 'Password non corretta' });
        }

        // Se tutto è corretto, restituisci l'oggetto user
        return done(null, user);
    } catch (err) {
        // In caso di errore nella ricerca dell'utente, gestisci l'errore
        return done(err);
    }
}));


module.exports = passport;
