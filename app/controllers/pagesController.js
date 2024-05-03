const User = require('../models/User');

const home = async (req, res, next) => {
    try {
        res.render('home');
    } catch (err) {
        return next(err);
    }
}

const loginPage = async (req, res, next) => {
    try {
        res.render('login');
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
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            role: 'user'
        });
        const newUser = await user.save();
        res.status(201).render('dashboard', { user: newUser });
    } catch (err) {
        return next(err);
    }
}

module.exports = { home, loginPage, register, createUser };