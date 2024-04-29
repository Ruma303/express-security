const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router
    .get('/:username/dashboard', userController.userDashboard)
    .post('/register', userController.createUser)

module.exports = router;