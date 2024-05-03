module.exports = function checkRole(role) {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) {
        // if (req.isAuthenticated() && roles.includes(req.user.role)) { più ruoli
            next();
        } else {
            res.status(403).render('errors/403');
        }
    };
}