const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/userController');
const passport = require('../middlewares/passport');

router
    .post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        // failureFlash: true
    }))
    .get('/dashboard', pagesController.dashboard)
    .post('/logout', pagesController.logout)

module.exports = router;