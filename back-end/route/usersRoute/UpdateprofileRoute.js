const {uploadProfile} = require('../../middleware/multer');
const express = require('express');
const route = express.Router();
const {updateprofile} = require('../../controllers/usercontrollers/updateprofile');
const {authentication} = require('../../middleware/authentications');
route.put('/updateprofile/:id',uploadProfile.single('file'),authentication,updateprofile);
module.exports = route;