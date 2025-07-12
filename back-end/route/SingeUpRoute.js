const {uploadProfile} = require('../middleware/multer');
const express = require('express');
const route = express.Router();
const {Singeup} = require('../controllers/singeup');
route.post('/singeup',uploadProfile.single('ProfileImage'),Singeup);
module.exports = route;