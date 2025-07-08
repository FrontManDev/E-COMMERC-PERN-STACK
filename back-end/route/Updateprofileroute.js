const upload = require('../middleware/multer');
const express = require('express');
const route = express.Router();
const {updateprofile} = require('../controllers/updateprofile');
const {authentication} = require('../middleware/authentications');
route.put('/updateprofile/:id',upload.single('ProfileImage'),authentication,updateprofile);
module.exports = route;