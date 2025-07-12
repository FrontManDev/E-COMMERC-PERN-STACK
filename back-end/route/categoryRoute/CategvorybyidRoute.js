const express = require('express');
const route = express.Router();
const {authentication} = require('../../middleware/authentications');
const {categorybyid} = require('../../controllers/categorycontrollers/categorybyid');
route.get('/category/:id',authentication,categorybyid);
module.exports = {route};