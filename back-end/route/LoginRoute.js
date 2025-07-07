const express = require('express');
const route = express.Router();
const {Login} = require('../controllers/login');
route.post('/login',Login);
module.exports = route;