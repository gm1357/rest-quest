import * as express from 'express';
import authenticateBasic from '../middlewares/authenticateBasic';
import { PlacesController } from '../controllers/places-controller';
const placeController = new PlacesController();

const router = express.Router();

router.post('/places/now', authenticateBasic, placeController.showCurrentLocation);

export { router as PlacesRouter };