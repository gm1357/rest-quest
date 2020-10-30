const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');

module.exports = passport => {
    passport.use(new LocalStrategy(User.authenticate()));
 
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    passport.use(new BasicStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, (err, user) => {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                
                user.authenticate(password, (err, user, passwordErr) => {
                    if (err) { return done(err); }
                    if (passwordErr) { return done(passwordErr); }
                    
                    return done(null, user);
                });
            });
        }
    ));
}