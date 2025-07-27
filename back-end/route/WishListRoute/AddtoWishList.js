const express = require('express');
const route = express.Router();
const {authentication} = require('../../middleware/authentications');
const {AddToWishList} = require('../../controllers/WishList/AddToWishList');
route.post('/addtowishlist',authentication,AddToWishList);
module.exports = route;