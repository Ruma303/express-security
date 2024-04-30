const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');
const passport = require('../middlewares/passport');

router
    .get('/', pagesController.home)

    .get('/login', pagesController.loginPage)

    .post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    }), pagesController.loginUser)

    .get('/register', pagesController.register)
    .post('/register', pagesController.createUser)

    .get('/dashboard', pagesController.dashboard)

    .post('/logout', pagesController.logout)

module.exports = router;