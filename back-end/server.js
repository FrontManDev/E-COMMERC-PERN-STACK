require('dotenv').config();
//import express framework
const express = require('express');
//create server express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import singeuproute 
const singeupRoute = require('./route/SingeUpRoute');
//activate the singeproute
const loginRoute = require('./route/LoginRoute');
app.use('/api',loginRoute);
app.use('/api',singeupRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
