const express = require('express');
const route = express.Router();
const {productbyid} = require('../../controllers/productscontrollers/productbyid');
const {authentication} = require('../../middleware/authentications');
const {IsAdmin} = require('../../middleware/Role');
route.get('/products/:id',authentication,IsAdmin,productbyid);
module.exports = route;