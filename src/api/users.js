const UsersController = require('../controllers/users-controller');
const authenticateBasic = require('../middlewares/authenticateBasic');

module.exports = app => {
    app.post('/users', UsersController.signup);
    app.post('/users/me', authenticateBasic, UsersController.checkUser);
}