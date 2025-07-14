const express = require('express');
const route = express.Router();
const {deletecategory} = require('../../controllers/categorycontrollers/deletecategory');
const {authentication} = require('../../middleware/authentications');
const {IsAdmin} = require('../../middleware/Role');
route.delete('/deletcategory/:id',authentication,IsAdmin,deletecategory);
module.exports = route;