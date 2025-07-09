require('dotenv').config();
//import express framework
const express = require('express');
//create server express
const app = express();

//cross middleware 
cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import singeuproute 
const singeupRoute = require('./route/SingeUpRoute');
//activate the singeproute
const loginRoute = require('./route/LoginRoute');
//activate the updateprofile route
const updateprofile = require('./route/Updateprofileroute');
app.use('/api',loginRoute);
app.use('/api',singeupRoute);
app.use('/api',updateprofile);
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
