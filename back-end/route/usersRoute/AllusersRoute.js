const express = require('express');
const route = express.Router();
const {allusers} = require('../../controllers/usercontrollers/allusers');
const {authentication} = require('../../middleware/authentications');
const {IsAdmin} = require('../../middleware/Role');
route.get('/allusers',authentication,IsAdmin,allusers);
module.exports = route;