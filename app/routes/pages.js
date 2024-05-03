const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

router
    .get('/', pagesController.home)
    .get('/register', pagesController.register)
    .post('/register', pagesController.createUser)

module.exports = router;