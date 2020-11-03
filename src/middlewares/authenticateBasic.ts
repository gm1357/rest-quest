import { NextFunction, Response, Request } from 'express';
import passport from '../config/passport';

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('basic', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send({ message: 'Password or username is incorrect' });
    req.user = user;
    next();
  })(req, res, next);
}