const cripto = require('crypto');
const secretKey = cripto.randomBytes(64).toString('base64').replace(/[\/=]/g, '');
console.log(secretKey);