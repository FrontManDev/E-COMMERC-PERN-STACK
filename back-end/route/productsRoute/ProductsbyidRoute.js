const express = require('express');
const route = express.Router();
const {productbyid} = require('../../controllers/productscontrollers/productbyid');
const {authentication} = require('../../middleware/authentications');
route.get('/products/:id',authentication,productbyid);
module.exports = route;