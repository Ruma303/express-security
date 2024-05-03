const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../middlewares/passport');

router
    .get('/login', (req, res) => {
            if(req.isAuthenticated()) return res.redirect('/dashboard')
            res.render('login');
        })
    .post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        // failureFlash: true
    }))
    .get('/dashboard', userController.dashboard)
    .get('/logout', userController.logout)

module.exports = router;