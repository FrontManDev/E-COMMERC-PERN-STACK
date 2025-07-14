const express = require('express');
const route = express.Router();
const {allcategory} = require('../../controllers/categorycontrollers/allcategory');
const {authentication} = require('../../middleware/authentications');
const {IsAdmin} = require('../../middleware/Role');
route.get('/allcategory',authentication,IsAdmin,allcategory);
module.exports = route;