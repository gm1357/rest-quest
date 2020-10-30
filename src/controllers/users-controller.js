const User = require('../models/user');

exports.signup = (req, res, next) => {
    User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, err => {
        if (err) {
            console.log('error while user register!', err);
            res.status(400).send({message: err.message});
            return;
        }

        res.send({
            message: 'Signed-up successfully'
        });
    })
};

exports.login = (req, res) => {
    passport.authenticate('local-login')(req, res);
};