

const passport = require('passport');
const User = require('../Model/model');

exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/profile'
});

exports.profile = (req, res) => {
    res.send(req.user);
};
