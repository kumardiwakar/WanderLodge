const express=require('express');
const User=require('../models/user.js');
const userController=require('../controllers/user.js')
const session = require('express-session');
const passport = require('passport');
const {saveRedirectUrl}=require('../middleware.js');
const flash = require('connect-flash');
const router=express.Router();
// Middleware setup
router.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

router.route('/signup')
.get(userController.renderSignupForm)
.post(userController.postSignupForm);

router.route('/login')
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate(
        'local',
        {failureRedirect:'/login',
            failureFlash:true
        }
    ),userController.postLoginForm);


    router.get('/logout',userController.logout);
module.exports=router;