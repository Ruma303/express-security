const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local-login', new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Utente non trovato' }); }
            if (!user.verifyPassword(password)) { return done(null, false, { message: 'Password non corretta' }); }
            return done(null, user);
        });
    }
));

module.exports = passport;
