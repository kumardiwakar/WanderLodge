const User=require('../models/user.js');
module.exports.renderSignupForm=(req,res)=>{
    res.render("user/signup.ejs");
};
module.exports.postSignupForm=async(req,res,next)=>{
    try{
        let {email,username,password}=req.body;
    let newUser=new User({email,username});
   let registerUser= await User.register(newUser,password);
   console.log(registerUser);
   req.login(registerUser,(err)=>{
        if(err){
          return  next(err);
        }
        console.log("Registered");
        req.flash('success','Welcome to wanderlust');
    res.redirect('/listing');
    })
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("user/login.ejs");
};
module.exports.postLoginForm=(req,res)=>{
    res.cookie('userId', req.user._id, { maxAge: 900000, httpOnly: true }); // Cookie expires in 15 minutes
    req.flash('success','Welcome back to Wanderlust');
    let redirectUrl=res.locals.redirectUrl || '/listing'
    res.redirect(redirectUrl);
   
};
module.exports.logout=(req,res,next)=>{
        
    req.logout((err)=>{
        if(err){
            next(err);
        }
    })
    res.redirect('/listing');
    req.flash('success','You are logged out');
}