import { NextFunction, Request, Response } from 'express';

export interface IPlacesController {
    showCurrentLocation (req: Request, res: Response, next: NextFunction): any;
    getItem(req: Request, res: Response, next: NextFunction): any;
    goToNextLocation(req: Request, res: Response, next: NextFunction): any;
}