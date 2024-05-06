    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const bcrypt = require('bcrypt');

    const UserSchema = new Schema({
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
            enum: ['admin', 'guest'],
            default: 'guest'
        }
    });

    UserSchema.methods.verifyPassword = async function(password) {
        const isMatch = await bcrypt.compare(password, this.password);
        console.log('Password match:', isMatch); //? Aggiunto per debug
        return isMatch;
    };
    module.exports = mongoose.model('User', UserSchema);


    