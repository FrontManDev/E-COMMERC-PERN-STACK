const express = require('express');
const route = express.Router();
const {allcategory} = require('../../controllers/categorycontrollers/allcategory');
route.get('/allcategory',allcategory);
module.exports = route;