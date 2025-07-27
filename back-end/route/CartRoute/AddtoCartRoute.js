const express = require('express');
const route = express.Router();
const {AddToCart} = require('../../controllers/Cart/AddToCart');
const {authentication} = require('../../middleware/authentications');
route.post('/addtocart',authentication,AddToCart);
module.exports = route; 