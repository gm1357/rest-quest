import * as express from 'express';
import container from '../config/installer';
import { SERVICE_IDENTIFIER } from '../constants/identifiers';
import authenticateBasic from '../middlewares/authenticateBasic';
import { IPlacesController } from '../interfaces/places-controller-interface';

const placeController = container.get<IPlacesController>(SERVICE_IDENTIFIER.IPlacesController);
const router = express.Router();

router.get('/places/now', authenticateBasic, placeController.showCurrentLocation);
router.post('/places/now/item', authenticateBasic, placeController.getItem);
router.post('/places/:direction', authenticateBasic, placeController.goToNextLocation);

export { router as PlacesRouter };