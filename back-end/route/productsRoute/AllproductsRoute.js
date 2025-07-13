const express = require('express');
const route = express.Router();
const {authentication} = require('../../middleware/authentications');
const {allproducts} = require('../../controllers/productscontrollers/allproducts');
route.get('/allproducts',authentication,allproducts);
module.exports = route;