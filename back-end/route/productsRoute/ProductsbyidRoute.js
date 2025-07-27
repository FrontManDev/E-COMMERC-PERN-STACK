const express = require('express');
const route = express.Router();
const {productbyid} = require('../../controllers/productscontrollers/productbyid');
route.get('/products/:id',productbyid);
module.exports = route;