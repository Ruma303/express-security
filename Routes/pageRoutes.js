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
        const options = { expiresIn: '100s' };
        const expires = 100;
        const cookieSettings = {
            maxAge: expires * 1000,
            httpOnly: true,
            secure: false
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);
        res.cookie('JWT', token, cookieSettings).send();
    })
    //console.log(req.cookies.JWT);
    .get('/check', (req, res) => {
        const token = req.cookies.JWT;
        if (!token) return res.status(401).send('Token mancante');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.send('Il token è valido');
            console.log(decoded);
        } catch (err) {
            console.log(err);
            return res.status(401).send('Token non valido');
        }
    })

