import { NextFunction, Request, Response } from 'express';
import Place from '../models/place';

export class PlacesController {
    async showCurrentLocation(req: Request, res: Response, next: NextFunction) {
        const place = await Place.findById((req.user as any).currentArea).exec();
        res.json(place);
    };
}