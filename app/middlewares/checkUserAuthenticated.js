module.exports = () => {
    return (req, res, next) => {
        if (req.path === '/login') return next();
        if (!req.isAuthenticated()) return res.redirect('/user/login');
        next();
    }
}