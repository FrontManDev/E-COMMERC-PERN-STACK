const express = require('express');
const {uploadProducts} = require('../../middleware/multer');
const route = express.Router();
const { authentication } = require('../../middleware/authentications');
const { addproducts } = require('../../controllers/productscontrollers/addproducts');
route.post('/addproducts',authentication,uploadProducts.array('file',5),addproducts);
module.exports = route;