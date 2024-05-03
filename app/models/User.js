const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', userSchema);