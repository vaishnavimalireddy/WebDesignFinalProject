const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require("multer");
const PORT = 4000;
const engines = require("consolidate");
const paypal = require("paypal-rest-sdk");

app.engine("ejs",engines.ejs);
app.set("views","./views");
app.set("view engines","ejs");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
const router = require('express').Router();
paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: 'AYLnfZOFb_9NmGjHAeeGGBjMI-3EtVsu7BBwZeVuANpEtvFab9q1eP4BDKpqGRwUblPEFYv6-A0dHMcl',
    client_secret: 'EC3H4FhNMZDklhyoHZipRWPz8PWo4rGROWXn0AmKyKpWd2TrdNfIjxwjoaBo1Iyopif8Tx0OLQCQaVmh'
  });



mongoose.connect('mongodb://localhost:27017/FoodAppDB', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})



const usersignupRouter = require('./routes/usersign');
app.use('/registration', usersignupRouter);


const buylistRouter = require('./routes/buylist');
app.use('/buylist', buylistRouter);

const sellpostRouter = require('./routes/sellerpost');
app.use('/addsellpost', sellpostRouter);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


