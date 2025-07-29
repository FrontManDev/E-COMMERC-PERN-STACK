const express = require('express');
const route = express.Router();
const {MinuseFromWishList} = require('../../controllers/WishList/MinuseFromWishList');
const {authentication} = require('../../middleware/authentications');
route.post('/minusfromwishlist',authentication,MinuseFromWishList);
module.exports = route;