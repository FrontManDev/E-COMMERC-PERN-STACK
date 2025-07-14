const express = require('express');
const route = express.Router();
const {authentication} = require('../../middleware/authentications');
const {allproducts} = require('../../controllers/productscontrollers/allproducts');
const {IsAdmin} = require('../../middleware/Role');
route.get('/allproducts',authentication,IsAdmin,allproducts);
module.exports = route;