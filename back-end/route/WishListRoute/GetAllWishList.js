const express = require('express');
const route = express.Router();
const {authentication} = require('../../middleware/authentications');
const {GetAllWishList} = require('../../controllers/WishList/getAllWishList');
route.get('/getallwishlist/:id',authentication,GetAllWishList);
module.exports = route;