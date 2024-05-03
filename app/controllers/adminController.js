const report = async (req, res, next) => {
    try {
        res.render('admin/report', {
            user: req.user
        });
    } catch (err) {
        return next(err);
    }
}

module.exports = { report };