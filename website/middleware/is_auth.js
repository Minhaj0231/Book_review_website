module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {

        req.flash('error', 'Login to add book')
        return res.redirect('/auth/login');
    }
    next();
}