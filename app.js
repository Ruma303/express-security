const express = require('express'), app = express();
const passport = require('passport');
const session = require('express-session');
const mongooseConnect = require('./app/config/dbConnection');


//% Configurazione Server
const PORT = process.env.PORT || 3000;
const SESSION_KEY = process.env.SESSION_KEY || 'mySecretKey';


//% Middleware
app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('public'));


//% Importazione Rotte
const pageRoutes = require('./app/routes/pages');
const authRoutes = require('./app/routes/auth');
const userRoutes = require('./app/routes/user');

app.use(pageRoutes);
app.use(authRoutes);
app.use('/user', userRoutes);

/* app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
}); */


//% Avvio Server
(async function run() {
    try {
        await mongooseConnect();
        app.listen(PORT, () => console.log(`Backend attivo sulla porta ${PORT}`));
    } catch (err) {
        console.error('Errore di connessione al database:', err);
    }
})()
