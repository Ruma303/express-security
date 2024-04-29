const home = async (req, res, next) => {
    try {
        res.render('home');
    } catch (err) {
        return next(err);
    }
}

const login = async (req, res, next) => {
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


module.exports = { home, login, register };