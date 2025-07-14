const {uploadProfile} = require('../../middleware/multer');
const express = require('express');
const route = express.Router();
const {updateprofile} = require('../../controllers/usercontrollers/updateprofile');
const {authentication} = require('../../middleware/authentications');
const {IsAdmin} = require('../../middleware/Role');
route.put('/updateprofile/:id',authentication,IsAdmin,uploadProfile.single('file'),updateprofile);
module.exports = route;