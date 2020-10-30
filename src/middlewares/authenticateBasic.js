module.exports = (req, res, next) => {
    passport.authenticate('basic', function(err, user, info) {
      if (err) return next(err);
      if (!user) return res.status(401).send({ message: 'Password or username is incorrect' });
      req.user = user;
      next();
    })(req, res, next);
  }