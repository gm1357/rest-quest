
import { Container } from 'inversify';
import { SERVICE_IDENTIFIER } from '../constants/identifiers';
import { PlacesController } from '../controllers/places-controller';
import { UsersController } from '../controllers/users-controller';
import { IPlacesController } from '../interfaces/places-controller-interface';
import { IPlacesService } from '../interfaces/places-service-interface';
import { IUsersController } from '../interfaces/users-controller-interface';
import { IUsersService } from '../interfaces/users-service-interface';
import PlacesService from '../services/places-service';
import UsersService from '../services/users-service';

const container = new Container();
container.bind<IPlacesService>(SERVICE_IDENTIFIER.IPlacesService).to(PlacesService);
container.bind<IPlacesController>(SERVICE_IDENTIFIER.IPlacesController).to(PlacesController);
container.bind<IUsersService>(SERVICE_IDENTIFIER.IUsersService).to(UsersService);
container.bind<IUsersController>(SERVICE_IDENTIFIER.IUsersController).to(UsersController);

export default container;