import User from '../models/user';
import { Document } from 'mongoose';
import PlacesService from './places-service';
const placesService = new PlacesService();

export default class UsersService {
    async signup(username: string, email: string, password: string) {
        try {
            const place = await placesService.getInitialArea();
            await this.registerUserPromise(username, email, password, place);
        } catch (err) {
            throw Error(err);
        }
    };

    async getInventory(userId: any) {
        const userInventory = await User
            .findById(userId, '-_id inventory')
            .populate('inventory', '-_id')
            .exec();
        return userInventory;
    }

    private registerUserPromise(username: string, email: string, password: string, place: Document) {
        return new Promise((resolve, reject) => {
            const newUser = new User({
                username,
                email,
                currentArea: place,
                inventory: []
            });
            User.register(newUser, password, err => {
                if (err) {
                    reject(err.message);
                }

                resolve();
            });
        })
    }
}