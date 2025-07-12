const express = require('express');
const route = express.Router();
const {blockuser} = require('../../controllers/usercontrollers/blockuser');
const {authentication} = require('../../middleware/authentications');
route.put('/blockuser/:id',authentication,blockuser);
module.exports = route;