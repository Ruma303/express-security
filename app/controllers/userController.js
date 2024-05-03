const User = require('../models/User');

const dashboard = async (req, res, next) => {
    try {
        const user = User.findOne( { username: req.user }); //! Non recupera l'utente corretto
        if (!user) {
            return res.redirect('/login');
        }
        res.render('dashboard', { user });
    } catch (err) {
        return next(err);
    }
}

const logout = async (req, res, next) => {
    try {
        res.render('login');
    } catch (err) {
        return next(err);
    }
}

module.exports = { dashboard, logout };