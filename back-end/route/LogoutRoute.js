const express = require('express');
const route = express.Router();
const {logout} = require('../controllers/logout');
route.post('/logout',logout);

module.exports = route;