const express = require('express');
const route = express.Router();
const {productbycategory} = require('../../controllers/productscontrollers/productbycategory');
route.get('/proudctbycategory/:id',productbycategory);
module.exports = route;