import * as express from 'express';
import authenticateBasic from '../middlewares/authenticateBasic';
import { PlacesController } from '../controllers/places-controller';
const placeController = new PlacesController();

const router = express.Router();

router.get('/places/now', authenticateBasic, placeController.showCurrentLocation);
router.post('/places/:direction', authenticateBasic, placeController.goToNextLocation);

export { router as PlacesRouter };