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

    private registerUserPromise(username: string, email: string, password: string, place: Document) {
        return new Promise((resolve, reject) => {
            User.register(new User({ username, email, currentArea: place}), password, err => {
                if (err) {
                    reject(err.message);
                }

                resolve();
            });
        })
    }
}