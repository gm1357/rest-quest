import * as express from 'express';
import { UsersController } from '../controllers/users-controller';
import authenticateBasic from '../middlewares/authenticateBasic';
const usersController = new UsersController();

const router = express.Router();

router.post('/users', usersController.signup);
router.get('/users/me', authenticateBasic, usersController.checkUser);
router.get('/users/me/inventory', authenticateBasic, usersController.getInventory);

export { router as UsersRouter };