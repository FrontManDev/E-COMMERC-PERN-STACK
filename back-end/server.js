require('dotenv').config();
//import express framework
const express = require('express');
const path = require("path");
//create server express
const app = express();
app.use('/usersImage', express.static(path.join(__dirname, 'usersImage')));
//cross middleware 
cors = require('cors');
app.use(cors());
app.use(express.json());
//
app.use(express.urlencoded({ extended: true }));
//import singeuproute 
const singeupRoute = require('./route/SingeUpRoute');
//activate the singeproute
const loginRoute = require('./route/LoginRoute');
//activate the updateprofile route
const updateprofile = require('./route/Updateprofileroute');
//activate the allusers route 
const allusrs = require('./route/AllusersRoute');
//activate block user route
const block = require('./route/BlockuserRoute');
//activate deblock user route
const deblock = require('./route/DeblockUserRoute');
//activate the user by id route
const userbyid = require('./route/UserbyidRoute');
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
