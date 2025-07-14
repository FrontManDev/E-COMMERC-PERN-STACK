const {authentication} = require('../../middleware/authentications');
const {addcategory} = require('../../controllers/categorycontrollers/addcategory');
const express = require('express');
const route = express.Router();
const {IsAdmin} = require('../../middleware/Role');
route.post('/category',authentication,IsAdmin,addcategory);
module.exports = route;