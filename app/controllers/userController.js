const dashboard = async (req, res, next) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }
    try {
        res.render('dashboard', { user: req.user });
    } catch (err) {
        return next(err);
    }
}

const logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err);
        console.log('Utente scollegato');
        res.redirect('/user/login');
    });
};

module.exports = { dashboard, logout };