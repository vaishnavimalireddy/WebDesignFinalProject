const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Seller = new Schema({
     
    phonenumber:{
        type:String
    },

    seller_email:{
        type:String
    },

    dishname:{
        type:String
    },

    cuisine:{
        type:String
    },

    lbs:{
        type:Number
    }, 

    quantity:{
        type:Number
    }, 

    price:{
        type:Number
    },

    photo:{
        type:String
    },

    address:{
       street1:String,
       street2:String,
       city:String,
       state:String,
       zipcode:Number
    }



});

module.exports = mongoose.model('Seller',Seller);