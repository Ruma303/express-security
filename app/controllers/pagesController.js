const User = require('../models/User');
const bcrypt = require('bcrypt');

const home = async (req, res, next) => {
    try {
        res.render('home');
    } catch (err) {
        return next(err);
    }
}

const register = async (req, res, next) => {
    try {
        res.render('register');
    } catch (err) {
        return next(err);
    }
}

const createUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        });
        const newUser = await user.save();
        res.status(201).render('dashboard', { user: newUser });
    } catch (err) {
        return next(err);
    }
}

module.exports = { home, register, createUser };