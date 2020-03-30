const express = require('express');
const router = express.Router();

const {check, body } =  require("express-validator"); 

const authcontroller = require('../controller/auth');

const User = require('../models/user')

router.get('/login',authcontroller.getLogin );

router.get('/signup', authcontroller.getSignUp);

router.post('/login',[
    check('email').isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),
    body('password', 'Password  length should be minimum 5').isLength({min:5})
    .isAlphanumeric().trim()

], authcontroller.postLogin);


router.post('/signup',[



    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
], authcontroller.postSignup)

router.get('/logout',  authcontroller.getLogout);



module.exports = router;