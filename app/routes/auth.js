const express = require('express');
const router = express.Router();

router.
    get('/login', (req, res) => {
        res.render('login');
    })
    .post('/login', (req, res) => {
        console.log(req.body);
        res.send('Login effettuato');
    })
    .get('/register', (req, res) => {
        res.render('register');
    })
    .post('/register', (req, res) => {
        console.log(req.body);
        res.send('Registrazione effettuata');
    });

module.exports = router;