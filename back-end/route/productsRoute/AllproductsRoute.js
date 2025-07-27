const express = require('express');
const route = express.Router();
const {allproducts} = require('../../controllers/productscontrollers/allproducts');
route.get('/allproducts',allproducts);
module.exports = route;