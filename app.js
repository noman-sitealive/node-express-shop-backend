const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jsonParser = bodyParser.json()
const app = express();
app.use(express.json());
// Import routes

const productRoute = require('./routes/products');
const orderRouter = require('./routes/orders');

// Use routes
app.use('/api/products', productRoute);
app.use('/api/orders', orderRouter);

app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
   allowedHeaders: 'Content-Type, Authorization, Origin, X-Registration-with, Accept'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
