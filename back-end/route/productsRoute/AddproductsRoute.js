const express = require('express');
const {uploadProducts} = require('../../middleware/multer');
const route = express.Router();
const { authentication } = require('../../middleware/authentications');
const { addproducts } = require('../../controllers/productscontrollers/addproducts');
const {IsAdmin} = require('../../middleware/Role');
route.post('/addproducts',authentication,IsAdmin,uploadProducts.array('file',5),addproducts);
module.exports = route;