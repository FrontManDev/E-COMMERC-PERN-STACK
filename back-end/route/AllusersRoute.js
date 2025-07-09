const express = require('express');
const route = express.Router();
const {allusers} = require('../controllers/allusers');
const {authentication} = require('../middleware/authentications');
route.get('/allusers',authentication,allusers);
module.exports = route;