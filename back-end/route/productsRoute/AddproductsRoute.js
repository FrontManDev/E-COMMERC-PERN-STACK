const express = require('express');
const {uploadProducts} = require('../../middleware/multer');
const route = express.Router();
const { authentication } = require('../../middleware/authentications');
const { addproducts } = require('../../controllers/productscontrollers/addproducts');
route.post('/addcategory',uploadProducts.array('file',5),authentication,addproducts);
module.exports = route;