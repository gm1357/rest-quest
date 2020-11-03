import { BasicStrategy } from 'passport-http';
import User from '../models/user';
import * as passport from 'passport';
import { PassportLocalErrorMessages } from 'mongoose';

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new BasicStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, (err: Error, user: any) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            
            user.authenticate(password, (err: Error, user: Document, passwordErr: PassportLocalErrorMessages) => {
                if (err) { return done(err); }
                if (passwordErr) { return done(passwordErr); }
                
                return done(null, user);
            });
        });
    }
));

export default passport;