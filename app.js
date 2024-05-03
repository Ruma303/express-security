const express = require('express'), app = express(), path = require('path');
const session = require('express-session');
const mongooseConnect = require('./app/config/dbConnection');
const passport = require('passport');
const checkUserAuth = require('./app/middlewares/checkUserAuthenticated');
const flash = require('connect-flash');


//% Configurazione Server
const PORT = process.env.PORT || 3000;
const SESSION_KEY = process.env.SESSION_KEY || 'mySecretKey';


//% Middleware
//# Configurazione EJS
app.set('views', path.resolve('app', 'views'));
app.set('view engine', 'ejs');

//# Middleware di sessione
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(flash()); //# Middleware per i messaggi flash

//# Inizializzazione Passport.js
app.use(passport.initialize());
app.use(passport.session());



//% Importazione Rotte
const pageRoutes = require('./app/routes/pages');
app.use(pageRoutes);

const userRoutes = require('./app/routes/user');
app.use('/user', checkUserAuth(), userRoutes);

//# Middleware per la gestione degli errori
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('error');
    next(err);
});

//# Rotta di fallback
app.all('*', (req, res) => res.status(404).render('404'));


//% Avvio Server
(async function run() {
    try {
        await mongooseConnect();
        app.listen(PORT, () => console.log(`Backend attivo sulla porta ${PORT}`));
    } catch (err) {
        console.error('Errore interno:', err);
    }
})()
