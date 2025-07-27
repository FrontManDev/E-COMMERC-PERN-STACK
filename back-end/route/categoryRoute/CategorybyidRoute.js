const express = require('express');
const route = express.Router();
const {categorybyid} = require('../../controllers/categorycontrollers/categorybyid');
route.get('/category/:id',categorybyid);
module.exports = route;