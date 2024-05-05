const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

module.exports = router.get('/report', adminController.report);