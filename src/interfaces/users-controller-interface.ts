import { NextFunction, Request, Response } from 'express';

export interface IUsersController {
    signup(req: Request, res: Response, next: NextFunction): any;
    checkUser(req: Request, res: Response): any;
    getInventory(req: Request, res: Response): any;
}