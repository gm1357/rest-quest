import { NextFunction, Request, Response } from 'express';
import PlacesService from '../services/places-service';
const placesService = new PlacesService();

export class PlacesController {

    showCurrentLocation = async (req: Request, res: Response, next: NextFunction) => {
        const place = await placesService.getCurrentPlace((req.user as any).currentArea);
        res.json(place);
    };

    goToNextLocation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const route = await placesService.goToNextLocation(
                (req.user as any).currentArea,
                req.params.direction,
                (req.user as any)._id
            );
            res.json(route);
        } catch (err) {
            next(err);
        }
    }
}