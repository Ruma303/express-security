module.exports = function checkRole(role) {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) {
            next();
        } else {
            res.status(403).render('errors/403');
        }
    };
}