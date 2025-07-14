const express = require('express');
const route = express.Router();
const {deblockuser} = require('../../controllers/usercontrollers/deblockuser');
const {authentication} = require('../../middleware/authentications');
const {IsAdmin} = require('../../middleware/Role');
route.put('/deblockuser/:id',authentication,IsAdmin,deblockuser);
module.exports = route;