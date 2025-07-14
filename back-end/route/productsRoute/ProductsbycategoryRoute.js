const express = require('express');
const route = express.Router();
const {productbycategory} = require('../../controllers/productscontrollers/productbycategory');
const {authentication} = require('../../middleware/authentications');
const {IsAdmin} = require('../../middleware/Role');
route.get('/proudctbycategory/:id',authentication,IsAdmin,productbycategory);
module.exports = route;