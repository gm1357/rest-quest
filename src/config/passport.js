const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = passport => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, username, password, done) => {

        process.nextTick(() => {

            User.findOne({ 'username': username }, (err, user) => {

                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(new Error('username already taken'), false, null);
                } else {
                    let newUser = new User();

                    newUser.username = username;
                    newUser.email = req.body.email;
                    newUser.password = newUser.generateHash(password);

                    newUser.save(err => {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser, null);
                    });
                }

            });    
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : false
    },
    (req, username, password, done) => {

        User.findOne({ 'username': email }, (err, user) => {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, null);

            if (!user.validPassword(password))
                return done(null, false, null);

            return done(null, user);
        });
    }));
};