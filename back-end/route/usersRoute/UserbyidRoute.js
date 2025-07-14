const express = require('express');
const route = express.Router();
const {UserById} = require('../../controllers/usercontrollers/userbyid');
const {authentication} = require('../../middleware/authentications');
const {IsAdmin} = require('../../middleware/Role');
route.get('/user/:id',authentication,IsAdmin,UserById);
module.exports = route; 