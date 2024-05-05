module.exports = () => {
    return (req, res, next) => {
        if (req.path === '/login' || req.path === '/logout') return next();
        if (!req.isAuthenticated()) return res.redirect('/user/login');
        next();
    }
}