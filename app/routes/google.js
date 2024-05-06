const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

module.exports = router
    .get('/google-auth', passport.authenticate('google', {
        scope: ['openid', 'email']
    }))
    .get('/google-auth-redirect', passport.authenticate('google', {
        successRedirect: '/user/dashboard',
        failureRedirect: '/user/login'
    }));