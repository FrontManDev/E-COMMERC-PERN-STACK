const express = require('express');
const route = express.Router();
const {authentication} = require('../../middleware/authentications');
const {categorybyid} = require('../../controllers/categorycontrollers/categorybyid');
const {IsAdmin} = require('../../middleware/Role');
route.get('/category/:id',authentication,IsAdmin,categorybyid);
module.exports = route;