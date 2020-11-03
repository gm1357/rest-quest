import { NextFunction, Request, Response } from 'express';
import User from '../models/user';

export class UsersController {
    signup(req: Request, res: Response, next: NextFunction) {
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

    checkUser(req: Request, res: Response) {
        res.json(req.user);
    };
}