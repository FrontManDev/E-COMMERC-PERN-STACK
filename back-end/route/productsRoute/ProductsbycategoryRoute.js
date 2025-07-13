const express = require('express');
const route = express.Router();
const {productbycategory} = require('../../controllers/productscontrollers/productbycategory');
const {authentication} = require('../../middleware/authentications');
route.get('/proudctbycategory/:id',authentication,productbycategory);
module.exports = route;