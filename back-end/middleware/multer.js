//import the middleware multer of file uploading
const multer = require('multer');
const path = require('path');
//create settings of multer
const ProfileStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"usersImage");
    },
    filename : function(req,file,cb){
        const ext = path.extname(file.originalname);
        const name = "profile_" + Math.round(Math.random()*1e6);
        cb(null,name+ext); 
    }
});
const ProductStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"ProductsImage");
    },
    filename : function(req,file,cb){
        const ext = path.extname(file.originalname);
        const name = "product_" + Math.round(Math.random()*1e6);
        cb(null,name+ext); 
    }
});
//create a middleware of multer
const uploadProfile = multer({storage:ProfileStorage });
const uploadProducts = multer({storage:ProductStorage});
//export the middleware
module.exports = {uploadProfile,uploadProducts};