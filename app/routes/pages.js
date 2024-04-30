const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

router
    .get('/', pagesController.home)

    .get('/login', pagesController.loginPage)
    .post('/login', pagesController.loginUser)

    .get('/register', pagesController.register)
    .post('/register', pagesController.createUser)

    .get('/dashboard', pagesController.dashboard)

    .post('/logout', pagesController.logout)

module.exports = router;