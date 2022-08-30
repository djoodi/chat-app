const passport = require('passport');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        // req.session.returnTo = req.originalUrl;
        // console.log('the returnTo url is',req.session.returnTo);
        // req.flash('error', 'You must be logged in.');
        next(new Error('not authorized'));
    }
    next();
}