const express = require('express');
const route = express.Router();
const {allcategory} = require('../../controllers/categorycontrollers/allcategory');
const {authentication} = require('../../middleware/authentications');
route.get('/allcategory',authentication,allcategory);
module.exports = route;