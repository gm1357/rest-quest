import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { SERVICE_IDENTIFIER } from '../constants/identifiers';
import { IPlacesService } from '../interfaces/places-service-interface';
import { IPlacesController } from '../interfaces/places-controller-interface';

@injectable()
export class PlacesController implements IPlacesController {

    constructor(
        @inject(SERVICE_IDENTIFIER.IPlacesService) private placesService: IPlacesService
    ) { }

    showCurrentLocation = async (req: Request, res: Response, next: NextFunction) => {
        const place = await this.placesService.getCurrentPlace((req.user as any).currentArea);
        res.json(place);
    };

    getItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const item = await this.placesService.getItem((req.user as any).currentArea, req.body.item, (req.user as any).id);
            res.json({
                message: `You got ${item.name}`
            });
        } catch (err) {
            next(err);
        }
    }

    goToNextLocation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const route = await this.placesService.goToNextLocation(
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