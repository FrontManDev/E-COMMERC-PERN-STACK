//import the middleware multer of file uploading
const multer = require('multer');
const path = require('path');
//create settings of multer
const Storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"usersImage");
    },
    filename : function(req,file,cb){
        const ext = path.extname(file.originalname);
        const name = "profile_" + Math.round(Math.random()*1e6);
        cb(null,name+ext); 
    }
});
//create a middleware of multer
const upload = multer({storage:Storage});
//export the middleware
module.exports = upload;