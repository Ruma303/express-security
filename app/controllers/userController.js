const User = require('../models/User');

const createUser = async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        const newUser = await user.save();
        res.status(201).redirect('/user/:username/dashboard', { user: newUser });
    } catch (err) {
        return next(err);
    }
}

const userDashboard = async (req, res, next) => {
    try {
        const user = User.findOne( { username: req.params.username });
        if (!user) {
            return res.redirect('/login');
        }
        res.render('dashboard', { user });
    } catch (err) {
        return next(err);
    }
}


module.exports = { createUser, userDashboard };