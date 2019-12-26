const router = require('express').Router();
let Seller = require('../models/seller.model');


router.route('/addsell').post((req, res) => {
    const phonenumber = req.body.phonenumber;
    const dishname = req.body.dishname;
    const cuisine = req.body.cuisine;
    const lbs = req.body.lbs;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const photo = req.body.photo;
    const street1 = req.body.address.street1;
    const street2 = req.body.address.street2;
    const city = req.body.address.city;
    const state = req.body.address.state;
    const zipcode = req.body.address.zipcode;
    const seller_email = req.body.seller_email;
    const address ={
        street1,
        street2,
        city,
        state,
        zipcode
    }
    console.log(phonenumber)
    const newSell = new Seller({
        seller_email,
       photo,
        phonenumber,
        dishname,
        cuisine,
        lbs,
        quantity,
        price,
        address
    })

  
    newSell.save()
    .then(() => res.json('Seller Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;