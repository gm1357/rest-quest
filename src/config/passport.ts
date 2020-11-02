import { BasicStrategy } from 'passport-http';
import User from '../models/user';
import * as passport from 'passport';

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new BasicStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, (err, user: any) => {
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

export default passport;