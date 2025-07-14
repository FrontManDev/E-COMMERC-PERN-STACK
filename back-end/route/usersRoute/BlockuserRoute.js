const express = require('express');
const route = express.Router();
const {blockuser} = require('../../controllers/usercontrollers/blockuser');
const {authentication} = require('../../middleware/authentications');
const {IsAdmin} = require('../../middleware/Role');
route.put('/blockuser/:id',authentication,IsAdmin,blockuser);
module.exports = route;