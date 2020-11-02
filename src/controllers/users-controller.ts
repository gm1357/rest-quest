import User from '../models/user';

export class UsersController {
    signup(req, res, next) {
        User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, err => {
            if (err) {
                console.log('error while user register!', err);
                res.status(400).send({message: err.message});
                return;
            }

            res.send({
                message: 'Signed-up successfully'
            });
        })
    };

    checkUser(req, res) {
        res.json(req.user);
    };
}