const UsersController = require('../controllers/users-controller');

module.exports = app => {
    app.post('/users', UsersController.signup);
}