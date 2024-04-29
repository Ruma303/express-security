const mongoose = require('mongoose');

require('dotenv').config();
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'mongoose';


async function mongooseConnect() {
    try {
        await mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`);
        console.log(`Connessione al database ${DB_NAME} riuscita`);
    } catch (err) {
        console.error('Errore di connessione al database:', err);
    } finally {
        return mongoose.connection;
    }
}

module.exports = mongooseConnect;