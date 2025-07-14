const express = require('express');
const route = express.Router();
const {authentication} = require('../../middleware/authentications');
const {deletproduct} = require('../../controllers/productscontrollers/deleteproduct');
const {IsAdmin} = require('../../middleware/Role');
route.delete('/deleteproduct/:id',authentication,IsAdmin,deletproduct);
module.exports = route;