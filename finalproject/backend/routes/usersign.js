const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
const _ = require('lodash');

const SENDGRID_API_KEY="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";
const JWT_SECRET="4356789023456DXFCGHVJBKNLM";
const JWT_ACCOUNT_ACTIVATION="XFYGUH45678897";
const EMAIL_TO="vaishnavimalireddy@gmail.com";
const EMAIL_FROM="noreply@foodmanagement.com";
const JWT_RESET_PASSWORD="GYTFDRESDXFGHUIJ987654678GVB"
const google_client_id = "547672589766-9rdugn3hc0fjqtbhfsor6daijf1sjrp3.apps.googleusercontent.com"
const { OAuth2Client } = require('google-auth-library');

sgMail.setApiKey(SENDGRID_API_KEY)

  router.route('/add').post((req, res) => {

    const { token } = req.body;

    if (token) {
        jwt.verify(token,JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if (err) {
                console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
                return res.status(401).json({
                    error: 'Expired link. Signup again'
                });
            }

            const { name, email, password } = jwt.decode(token);

            const user1 = new User({ name, email, password });
            
            User.findOne({ email }, (err, user) => {
                if (!user) {
                    user1.save((err, user12) => {
                        if (err) {
                            console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
                            return res.status(401).json({
                                error: 'Error saving user in database. Try signup again'
                            });
                        }
                        return res.json({
                            message: 'Your email has been verified.You can Login in now .'
                        });
                    });
                }
                else if(user){
                    return res.status(401).json({
                        error: 'Your account has been activated already.'
                    });
                }
                else if (err)
                {
                    return res.status(400).json({
                        error: 'Something went wrong. Try later'
                    });
                }
            });
           


        });
    } else {
        return res.json({
            message: 'Something went wrong. Try again.'
        });
    }

  });

  router.route('/checkemail').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        console.log("inside actibvate")

        const token = jwt.sign({ name, email, password },JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });

        const emailData = {
            from: EMAIL_FROM,
            to: email,
            subject: `Account activation link`,
            html: `
                <h1>Please use the following link to activate your account</h1>
                <p>http://localhost:3000/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
               
            `
        };

        sgMail
            .send(emailData)
            .then(sent => {
                console.log('SIGNUP EMAIL SENT')
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                });
            })
            .catch(err => {
                 console.log('SIGNUP EMAIL SENT ERROR', err)
                return res.json({
                    message: err.message
                });
            });
    });

  });

  router.route('/validateEmail').post((req, res) => {
    User.findOne({email:req.body.email})
        .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
       
  });

  router.route('/login').post((req, res) => {
    User.findOne({email:req.body.email,password:req.body.password})
        .then(user => user ? res.sendStatus(200) : res.sendStatus(204))

        // const token = jwt.sign({ _id: user._id },JWT_SECRET, { expiresIn: '7d' });
        // const { _id, name, email, role } = user;

        // return res.json({
        //     token,
        //     user: { _id, name, email, role }
        // });
       
  });

  router.route('/forgotpassword').put((req, res) => {
    
    const { email } = req.body;
    console.log(email)
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist'
            });
        }

        const token = jwt.sign({ _id: user._id,name:user.name},JWT_RESET_PASSWORD, { expiresIn: '10m' });

        const emailData = {
            from: EMAIL_FROM,
            to: email,
            subject: `Password Reset link`,
            html: `
                <h1>Please use the following link to reset your password</h1>
                <p>http://localhost:3000/reset/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
            
            `
        };

        sgMail
            .send(emailData)
            .then(sent => {
                // console.log('SIGNUP EMAIL SENT', sent)
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                });
            })
            .catch(err => {
                // console.log('SIGNUP EMAIL SENT ERROR', err)
                return res.json({
                    message: err.message
                });
            });
    });
  });


  router.route('/resetpassword').put((req, res) => {
    const { id, newPassword } = req.body;
    console.log("inside reset")
   
            console.log("inside token")
         

            User.findOne({ _id:id }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Something went wrong. Try later'
                    });
                }

                const updatedFields = {
                    password: newPassword,
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Error resetting user password'
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password`
                    });
                });
            });
       
    
  });

  const client = new OAuth2Client(google_client_id);

  router.route('/google-login').post((req, res) => {
    const { idToken } = req.body;
    console.log("inide ffdf");
    client.verifyIdToken({ idToken, audience: google_client_id }).then(response => {
        // console.log('GOOGLE LOGIN RESPONSE',response)
        const { email_verified, name, email} = response.payload;
        if (email_verified) {
            User.findOne({ email}).exec((err, user) => {
                if (user) {
                    const token = jwt.sign({ _id: user._id },JWT_SECRET, { expiresIn: '7d' });
                    const { _id, email, name } = user;
                    return res.json({
                        token,
                        user: { _id, email, name }
                    });
                } else {
                    const password = "dssf";
                    user = new User({ name, email, password });
                    user.save((err, data) => {
                        if (err) {
                            console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                            return res.status(400).json({
                                error: 'User signup failed with google'
                            });
                        }
                        const token = jwt.sign({ _id: data._id },JWT_SECRET, { expiresIn: '7d' });
                        const { _id, email, name, role } = data;
                        return res.json({
                            token,
                            user: { _id, email, name, password }
                        });
                    });
                }
            });
        } else {
            return res.status(400).json({
                error: 'Google login failed. Try again'
            });
        }
    });

});





  module.exports = router;