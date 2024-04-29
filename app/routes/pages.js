const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

router
    .get('/', pagesController.home)
    .get('/login', pagesController.login)
    .get('/register', pagesController.register)

    
module.exports = router;