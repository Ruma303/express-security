const User = require('../models/User');

const dashboard = async (req, res, next) => {
    if (!req.user) {
        // Se non c'è un utente nella sessione, reindirizzare al login
        return res.redirect('/user/login');
    }
    try {
        // Passa direttamente req.user alla vista
        res.render('dashboard', { user: req.user });
    } catch (err) {
        return next(err);
    }
}

const logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/user/login');
    });
};

module.exports = { dashboard, logout };