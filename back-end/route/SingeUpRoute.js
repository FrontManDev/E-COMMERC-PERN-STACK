const upload = require('../middleware/multer');
const express = require('express');
const route = express.Router();
const {Singeup} = require('../controllers/singeup');
route.post('/singeup',upload.single('ProfileImage'),Singeup);
module.exports = route;