const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const checkRole = require('../middlewares/checkRole');

router.get('/report', checkRole('admin'), adminController.report);

module.exports = router;