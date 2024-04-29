const express = require('express');
const router = express.Router();

router.
    get('/', (req, res) => {
        res.send('dashboard');
    })
    /* .post('/', (req, res) => {
        console.log(req.body);
        res.send('Login effettuato');
    }); */

module.exports = router;