const express = require('express');
const route = express.Router();
const {authentication} = require('../../middleware/authentications');
const {deletproduct} = require('../../controllers/productscontrollers/deleteproduct');

route.delete('/deleteproduct/:id',authentication,deletproduct);

module.exports = route;