const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

//Config Env Variables
dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.json());

//CORS Rules
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const usersRoutes = require('./routes/user');
app.use('/user', usersRoutes);

const materialsRoutes = require('./routes/material');
app.use('/material', materialsRoutes);

const servicesRoutes = require('./routes/service');
app.use('/service', servicesRoutes);

const customerRoutes = require('./routes/customer');
app.use('/customer', customerRoutes);

const orderRoutes = require('./routes/order')
app.use('/order', orderRoutes);

const materialOrderRoutes = require('./routes/materialorders');
app.use('/materialorder', materialOrderRoutes);

const serviceOrderRoutes = require('./routes/Serviceorders');
app.use('/serviceorder', serviceOrderRoutes);


module.exports = app;