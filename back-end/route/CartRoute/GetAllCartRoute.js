const express = require('express');
const route = express.Router();
const {GetAllCart} = require('../../controllers/Cart/GetAllCart');
const {authentication} = require('../../middleware/authentications');
route.get('/Allcartitem/:id',authentication,GetAllCart);
module.exports = route;