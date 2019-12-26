const router = require('express').Router();
let Seller = require('../models/seller.model');
const bodyParser = require("body-parser");
const paypal = require("paypal-rest-sdk");
paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: 'AYLnfZOFb_9NmGjHAeeGGBjMI-3EtVsu7BBwZeVuANpEtvFab9q1eP4BDKpqGRwUblPEFYv6-A0dHMcl',
    client_secret: 'EC3H4FhNMZDklhyoHZipRWPz8PWo4rGROWXn0AmKyKpWd2TrdNfIjxwjoaBo1Iyopif8Tx0OLQCQaVmh'
  });

router.route('/list').get((req, res) => {
    Seller.find(function(err, sellers) {
        if (err) {
            console.log(err);
        } else {
            res.json(sellers);
        }
    });
       
  });

  router.route('/paypal').post((req, res) => {

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/paymentsucess",
            "cancel_url": "http://localhost:3000/buy"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "10",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "10.00"
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        console.log("hi");
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            return res.json({
              link:payment.links[1].href
            });
          
        }
    });

});


  module.exports = router;