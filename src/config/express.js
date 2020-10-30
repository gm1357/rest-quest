const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
passport = require('passport');
mongoose = require('mongoose');
require('dotenv').config();
require('./passport')(passport);

module.exports = () => {
    app = express();

    mongoose.set('debug',true);
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    
    consign()
        .include('src/api')
        .into(app);

    app.use((err, req, res, next) => {
        return res.status(err.status || 500).json({ message: err.message });
    });
    
    return app;
}