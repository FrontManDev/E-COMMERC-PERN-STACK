const express = require('express');
const route = express.Router();
const {deletecategory} = require('../../controllers/categorycontrollers/deletecategory');
const {authentication} = require('../../middleware/authentications');
route.delete('/deletcategory/:id',authentication,deletecategory);
module.exports = route;