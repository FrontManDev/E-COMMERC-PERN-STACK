const express = require('express');
const route = express.Router();
const {DeleteFromCart} = require('../../controllers/Cart/DeletFromCart');
const {authentication} = require('../../middleware/authentications');
route.delete('/deletefromcart',authentication,DeleteFromCart);
module.exports = route; 