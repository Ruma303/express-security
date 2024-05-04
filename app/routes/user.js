const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../config/passport');

router
    .get('/login', (req, res) => {
            if(req.isAuthenticated()) return res.redirect('/user/dashboard')
            res.render('login', {
                userNotFound : req.flash('userNotFound'),
                incorrectPassword : req.flash('incorrectPassword')
            });
        })
    .post('/login', passport.authenticate('local-login', {
        successRedirect: '/user/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    }))
    .get('/dashboard', userController.dashboard)
    .get('/logout', userController.logout)

module.exports = router;