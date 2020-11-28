import { NextFunction, Request, Response } from 'express';
import PlacesService from '../services/places-service';
const placesService = new PlacesService();

export class PlacesController {

    async showCurrentLocation (req: Request, res: Response, next: NextFunction) {
        const place = await placesService.getCurrentPlace((req.user as any).currentArea);
        res.json(place);
    };

    async getItem(req: Request, res: Response, next: NextFunction) {
        try {
            const item = await placesService.getItem((req.user as any).currentArea, req.body.item, (req.user as any).id);
            res.json({
                message: `You got ${item.name}`
            });
        } catch (err) {
            next(err);
        }
    }

    async goToNextLocation(req: Request, res: Response, next: NextFunction) {
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