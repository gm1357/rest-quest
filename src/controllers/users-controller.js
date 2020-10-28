const User = require('../models/user');

exports.signup = (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            res.sendStatus(400);
        } else {
            res.send({
                message: 'Signed-up successfully'
            });
        }
    })(req, res, next);
};

exports.login = (req, res) => {
    passport.authenticate('local-login')(req, res);
};