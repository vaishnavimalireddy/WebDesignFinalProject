
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema({
        
    name:{
        type:String
    },

    email:{
        type:String
    },

    password:{
        type:String
    }



});

// User.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

// User.path('pass').validate((val1) => {
//     passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,10}$/;
//     return passRegex.test(val1);
// }, 'Invalid password.It must contain atleast 1 UpperCase, 1 Lower Case,1 Special Character and minimum 6 letters');


module.exports = mongoose.model('User',User);