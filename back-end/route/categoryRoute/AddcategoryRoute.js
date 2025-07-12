const {authentication} = require('../../middleware/authentications');
const {addcategory} = require('../controllers/addcategory');
const express = require('express');
const route = express.Router();
route.post('/category',authentication,addcategory);
module.exports = route;