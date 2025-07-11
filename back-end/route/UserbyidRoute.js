const express = require('express');
const route = express.Router();
const {UserById} = require('../controllers/userbyid');
const {authentication} = require('../middleware/authentications');
route.get('/user/:id',authentication,UserById);
module.exports = route; 