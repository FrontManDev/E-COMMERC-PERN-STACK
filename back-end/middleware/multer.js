//import the middleware multer of file uploading
const multer = require('multer');
//create middleware multer
const upload = multer({dest:'profileImages'});
//export the middleware
module.exports = upload;