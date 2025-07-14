const express = require('express');
const route = express.Router();
const {updateproducts} = require('../../controllers/productscontrollers/updateproducts');
const {authentication} = require('../../middleware/authentications');
const {uploadProducts} = require('../../middleware/multer');
const {IsAdmin} = require('../../middleware/Role');
route.put('/updateproducts/:id',authentication,IsAdmin,uploadProducts.array('file',5),updateproducts);
module.exports = route;