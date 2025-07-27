const express = require('express');
const route = express.Router();
const {authentication} = require('../../middleware/authentications');
const {DeleteFromWishList} = require('../../controllers/WishList/DeleteFromWishList');
route.post('/deletefromwishlist',authentication,DeleteFromWishList);
module.exports = route;