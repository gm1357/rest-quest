import { NextFunction, Request, Response } from 'express';
import Route from '../models/route';
import Place from '../models/place';
import User from '../models/user';

export class PlacesController {
    private readonly directions = ['north', 'south', 'west', 'east'];

    showCurrentLocation = async (req: Request, res: Response, next: NextFunction) => {
        const place = await Place
            .findById((req.user as any).currentArea, '-_id')
            .populate('north', '-_id nextArea')
            .populate('south', '-_id nextArea')
            .exec();

        await this.populateDirections(place);

        res.json(place);
    };

    goToNextLocation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const direction = req.params.direction;

            if (!this.directions.includes(direction)) {
                throw { message: 'Direction must be north, south, east or west', status: 400 };
            }

            const nextRouteId = (await Place.findById((req.user as any).currentArea, direction) as any)[direction];
            
            if (!nextRouteId) {
                throw { 
                    message: `There is no path in that direction. Explore the place with GET /places/now to see the paths available`,
                    status: 404
                };
            }

            const route = (await Route.findById(nextRouteId, '-_id'));
            await User.updateOne({ _id: (req.user as any)._id }, { currentArea: (route as any).nextArea });

            res.json(route);
        } catch (err) {
            next(err);
        }
    }

    private populateDirections = async (place: any) => {
        for (const direction of this.directions) {
            await this.populateDirection(place, direction);
        }
    }

    private populateDirection = async (place: any, direction: string) => {
        await Place.populate(place[direction], {
            path: 'nextArea',
            select: '-_id name'
        });
    }
}