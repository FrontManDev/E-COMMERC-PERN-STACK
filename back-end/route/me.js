const express = require('express');
const route = express.Router();
const {me} = require('../controllers/mecontroller');
route.get('/me',me);
module.exports = route;