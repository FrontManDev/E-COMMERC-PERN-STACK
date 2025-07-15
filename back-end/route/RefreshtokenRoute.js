const express = require('express');
const route = express.Router();
const {refreshtokencontrollers} = require('../controllers/refreshtokencontrollers');
route.post('/refrech-token',refreshtokencontrollers);
module.exports = route;