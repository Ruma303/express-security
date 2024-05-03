const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

router
    .get('/', pagesController.home)
    .get('/login',
    /* (req, res, next) => {
        if(req.isAuthenticated()) return res.redirect('/dashboard')
        next();
    }, */
    pagesController.loginPage)
    .get('/register', pagesController.register)
    .post('/register', pagesController.createUser)

module.exports = router;