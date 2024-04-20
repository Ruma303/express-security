const express = require('express'), mongoose = require('mongoose'),
app = express();
const { v4: uuidv4 } =  require('uuid');
const session = require('express-session');
const MongoStore = require('connect-mongo');


//, Variabili d'ambiente
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'mongoose';

app.use(express.json())

    //# Middleware di sessione
    .use(session({
        secret: process.env.SESSION_KEY || 'mySecretKey',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        genid: () => uuidv4(),
        store: MongoStore.create({ mongoUrl: `mongodb://localhost:${DB_PORT}/${DB_NAME}` })
    }));


//% Importazione Rotte
const pageRoutes = require('./Routes/pageRoutes');

app.use(pageRoutes)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
});


//% Connessione a MongoDB
(async function run() {
    try {
        await mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`);
        console.log(`Connessione al database ${DB_NAME} riuscita`);
        app.listen(PORT, () => console.log(`Backend attivo sulla porta ${PORT}`));
    } catch (err) {
        console.error('Errore di connessione al database:', err);
    }
})()
