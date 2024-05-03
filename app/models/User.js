const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

userSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', userSchema);