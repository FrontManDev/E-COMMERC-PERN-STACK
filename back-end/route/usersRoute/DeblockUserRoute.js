const express = require('express');
const route = express.Router();
const {deblockuser} = require('../controllers/deblockuser');
const {authentication} = require('../../middleware/authentications');
route.put('/deblockuser/:id',authentication,deblockuser);
module.exports = route;