const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    const token = req.cookies.JWT;
    const options = { expiresIn: '100s', algorithm: 'RS256' };
    if (!token) return res.status(401).send('Token mancante');
    try {
        const pubKey = fs.readFileSync(path.resolve('rsa.public'));
        const decoded = jwt.verify(token, pubKey, options);
        console.log(decoded);
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send('Token non valido');
    }
}

