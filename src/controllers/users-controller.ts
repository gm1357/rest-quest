import { NextFunction, Request, Response } from 'express';
import UserService from '../services/users-service';
const userService = new UserService();

export class UsersController {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            await userService.signup(req.body.username, req.body.email, req.body.password);
            res.send({ message: 'Signed-up successfully'});
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    };

    checkUser(req: Request, res: Response) {
        res.json(req.user);
    };
}