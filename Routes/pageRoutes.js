const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports = router
    .post('/login', (req, res) => {
        const payload = { id: 1, username: 'admin', isLogged: true };
        const options = { expiresIn: '10s' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);
        res.send(token);
    })
    .get('/login', (req, res) => {
        const payload = { id: 1, username: 'admin', isLogged: true };
        const options = { expiresIn: '10s' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);
        res.cookie('JWT', token).send();
    })
    .get('/check', (req, res) => {
        console.log(req.cookies.JWT);
        res.send();
    })
    .get('/logout', (req, res) => {
        req.session.isLogged = false;
        res.send('Logout effettuato');
    })
    .get('/destroy', (req, res) => {
        req.session.destroy(err => console.log(err));
        res.send('Sessione distrutta');
    })