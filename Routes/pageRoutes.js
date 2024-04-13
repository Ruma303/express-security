const express = require('express');
const router = express.Router();

module.exports = router
    .get('/session', (req, res) => {
        console.log(req.session.id);
        req.session.theme = 'dark';
        res.send('Sessione attiva');
    })
    .get('/theme', (req, res) => {
        res.send(`Tema impostato a ${req.session.theme}`);
    })
    .get('/login', (req, res) => {
        req.session.isLogged = true;
        res.send();
    })
    .get('/verify', (req, res) => {
        if (!req.session.isLogged) return res.send('Utente non autenticato');
        res.send(`L'utente è autenticato`);
    })
    .get('/logout', (req, res) => {
        req.session.isLogged = false;
        res.send('Logout effettuato');
    })
    .get('/destroy', (req, res) => {
        req.session.destroy(err => console.log(err));
        res.send('Sessione distrutta');
    })