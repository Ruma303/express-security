const express = require('express'), app = express(), path = require('path');
const session = require('express-session');
const mongooseConnect = require('./app/config/dbConnection');
const passport = require('passport');


//% Configurazione Server
const PORT = process.env.PORT || 3000;
const SESSION_KEY = process.env.SESSION_KEY || 'mySecretKey';


//% Middleware
app.set('views', path.resolve( 'app', 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));

//# Inizializzare Passport
app.use(passport.initialize());
app.use(passport.session());


//# Definizione Local Strategy


//# Serializzazione e Deserializzazione
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Trova l'utente nel database in base all'ID
    // Se l'utente esiste, chiama done(null, user)
    // Altrimenti, chiama done(null, false)
});



//% Importazione Rotte
const pageRoutes = require('./app/routes/pages');

app.use(pageRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Qualcosa è andato storto!');
});


//% Avvio Server
(async function run() {
    try {
        await mongooseConnect();
        app.listen(PORT, () => console.log(`Backend attivo sulla porta ${PORT}`));
    } catch (err) {
        console.error('Errore interno:', err);
    }
})()
