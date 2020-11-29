import * as express from 'express';
import container from '../config/installer';
import { SERVICE_IDENTIFIER } from '../constants/identifiers';
import { IUsersController } from '../interfaces/users-controller-interface';
import authenticateBasic from '../middlewares/authenticateBasic';

const usersController = container.get<IUsersController>(SERVICE_IDENTIFIER.IUsersController);
const router = express.Router();

router.post('/users', usersController.signup);
router.get('/users/me', authenticateBasic, usersController.checkUser);
router.get('/users/me/inventory', authenticateBasic, usersController.getInventory);

export { router as UsersRouter };