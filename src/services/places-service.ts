import User from '../models/user';
import Place from '../models/place';
import Route from '../models/route';
import Item from '../models/item';
import { injectable } from 'inversify';
import { IPlacesService } from '../interfaces/places-service-interface';

@injectable()
export default class PlacesService implements IPlacesService {
    private readonly directions = ['north', 'south', 'west', 'east'];

    async getCurrentPlace(currentAreaId: any) {
        const place = await Place
            .findById(currentAreaId, '-_id')
            .populate('north', '-_id nextArea')
            .populate('south', '-_id nextArea')
            .exec();

        await this.populateDirections(place);

        return place;
    };

    async getItem(currentAreaId: any, itemName: string, userId: string) {
        const itemSearch: any = await Item.findOne({ 'name': itemName });
        const place: any = await Place.findById(currentAreaId, 'items');
        const item = place.items.find((item: string) => item == itemSearch?.id);

        if (item == null) {
            throw { message: `${itemName} was not found on this current place`, status: 404 };
        }

        let res = await Place.updateOne({ _id: currentAreaId }, { $pull: { items: item }});
        if (res) {
            res = await User.updateOne({ _id: userId }, { $push: { inventory: item } });
        }

        return itemSearch;
    }

    async goToNextLocation(currentAreaId: any, direction: string, userId: any) {
        try {
            if (!this.directions.includes(direction)) {
                throw { message: 'Direction must be north, south, east or west', status: 400 };
            }

            const nextRouteId = (await Place.findById(currentAreaId, direction) as any)[direction];
            
            if (!nextRouteId) {
                throw {
                    message: `There is no path in that direction. Explore the place with GET /places/now to see the paths available`,
                    status: 404
                };
            }

            const route = (await Route.findById(nextRouteId, '-_id'));
            await User.updateOne({ _id: userId }, { currentArea: (route as any).nextArea });

            return route;
        } catch (err) {
            throw err;
        }
    }

    async getInitialArea() {
        return await Place.findOne({name: 'Woods'}).exec();
    }

    private async populateDirections(place: any) {
        for (const direction of this.directions) {
            await this.populateDirection(place, direction);
        }
    }

    private async populateDirection(place: any, direction: string) {
        await Place.populate(place[direction], {
            path: 'nextArea',
            select: '-_id name'
        });
    }
}