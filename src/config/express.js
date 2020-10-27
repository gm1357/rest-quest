const express = require('express');
const consign = require('consign');
require('dotenv').config();

module.exports = () => {
    app = express();

    consign()
        .include('src/api')
        .into(app);

    return app;
}