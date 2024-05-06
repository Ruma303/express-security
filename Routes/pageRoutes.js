const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const checkAuth = require('../Middlewares/user-auth');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const options = { expiresIn: '100s', algorithm: 'RS256' };

module.exports = router
    .post('/login', (req, res) => {
        const payload = { id: 1, username: 'admin', isLogged: true };
        const options = { expiresIn: '10s' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);
        res.send(token);
    })

    // % HS256
    /* .get('/login', (req, res) => {
        const payload = { id: 1, username: 'admin', isLogged: true };
        const options = { expiresIn: '100s' };
        const expires = 100;
        const cookieSettings = {
            maxAge: expires * 1000,
            httpOnly: true,
            secure: false
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);
        res.cookie('JWT', token, cookieSettings).send('Login effettuato');
    }) */

    /* .get('/check', (req, res) => {
        console.log(req.cookies.JWT);
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
    }) */

    // % RS256
    .get('/login', (req, res) => {
        const payload = { id: 1, username: 'admin', isLogged: true };
        const expires = 100;
        const cookieSettings = {
            maxAge: expires * 1000,
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        };
        const prvKey = fs.readFileSync(path.resolve('rsa.private'));
        const token = jwt.sign(payload, prvKey, options);
        res.cookie('JWT', token, cookieSettings).send('Login effettuato');
    })
    /* .get('/check', (req, res) => {
        const token = req.cookies.JWT;
        if (!token) return res.status(401).send('Token mancante');
        try {
            const pubKey = fs.readFileSync(path.resolve('rsa.public'));
            const decoded = jwt.verify(token, pubKey, options);
            res.send('Il token è valido');
            console.log(decoded);
        } catch (err) {
            console.log(err);
            return res.status(401).send('Token non valido');
        }
    }) */

    
    //% Middleware
    .get('/check', checkAuth, (req, res) => {
        res.send('Il token è valido');
    })

    //% Logout
    .get('/logout', (req, res) => {
        /* res.cookie('JWT', '', {
            maxAge: 0,
            httpOnly: 0,
            secure: false
        }).send('Logout effettuato'); */
        res.clearCookie('JWT').send('Logout effettuato');
    })

    //% CSRF
    .get('/change-email', csrfProtection, (req, res) => {
        const csrfToken = req.csrfToken();
        res.render('change-email', { csrfToken });
        console.log(csrfToken);
    })
    .post('/change-email', csrfProtection, (req, res) => {
        console.log(req.body);
        res.send('Email cambiata');
    })