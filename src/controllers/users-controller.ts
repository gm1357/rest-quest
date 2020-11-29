import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { SERVICE_IDENTIFIER } from '../constants/identifiers';
import { IUsersController } from '../interfaces/users-controller-interface';
import { IUsersService } from '../interfaces/users-service-interface';

@injectable()
export class UsersController implements IUsersController {

    constructor(
        @inject(SERVICE_IDENTIFIER.IUsersService) private usersService: IUsersService
    ) { }

    signup = async  (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.usersService.signup(req.body.username, req.body.email, req.body.password);
            res.send({ message: 'Signed-up successfully'});
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    };

    checkUser = (req: Request, res: Response) => {
        res.json(req.user);
    };

    getInventory = async (req: Request, res: Response) => {
        const inventory = await this.usersService.getInventory(req.user);
        res.json(inventory);
    };
}