require('dotenv').config();
//import express framework
const express = require('express');
const path = require("path");
//create server express
const app = express();
app.use('/usersImage', express.static(path.join(__dirname, 'usersImage')));
//cros middleware 
cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//import singeuproute 
const singeupRoute = require('./route/SingeUpRoute');
//activate the singeproute
const loginRoute = require('./route/LoginRoute');
//activate the updateprofile route
const updateprofile = require('./route/usersRoute/Updateprofileroute');
//activate the allusers route 
const allusrs = require('./route/usersRoute/AllusersRoute');
//activate block user route
const block = require('./route/usersRoute/BlockuserRoute');
//activate deblock user route
const deblock = require('./route/usersRoute/DeblockUserRoute');
//activate the user by id route
const userbyid = require('./route/usersRoute/UserbyidRoute');
//activate the add products category
const addcategory = require('./route/categoryRoute/AddcategoryRoute');
//activate the add products route
const addproducts = require('./route/productsRoute/AddproductsRoute');
//activate the all category route
const allcategory = require('./route/categoryRoute/AllcategoryRoute');
//activate the delete category route 
const deletcategory = require('./route/categoryRoute/DeletecategoryRoute');
//activate the category by id route 
const categorybyid = require('./route/categoryRoute/CategorybyidRoute');
app.use('/api',deletcategory);
app.use('/api',categorybyid);
app.use('/api',allcategory);
app.use('/api',addproducts);
app.use('/api',addcategory);
app.use('/api',allusrs);
app.use('/api',loginRoute);
app.use('/api',singeupRoute);
app.use('/api',updateprofile);
app.use('/api',block);
app.use('/api',deblock);
app.use('/api',userbyid);
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
