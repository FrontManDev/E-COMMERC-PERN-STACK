const express = require('express');
const route = express.Router();
const {MinusFromCart} = require('../../controllers/Cart/MinuseFromCart');
const {authentication} = require('../../middleware/authentications');
route.post('/minusfromcart',authentication,MinusFromCart);
module.exports = route;