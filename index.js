if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const listingRouter=require('./route/listings.js');
const reviewRouter=require('./route/review.js');
const signupRouter=require('./route/user.js');
const path=require('path');
const flash = require('connect-flash');
 const session=require('express-session');
 const MongoStore=require('connect-mongo');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User=require('./models/user.js');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))
app.engine('ejs',ejsMate);
const dbUrl=process.env.ATLASDB_URL;
const store=MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter:24*60*60,
})

store.on("error",()=>{
  console.log("ERROR in MONGO STORE" , error);
})

app.use(session({
           store,
          secret:process.env.SECRET,
          resave:false,
          saveUninitialized:true,
          cookie:{
            expires:Date.now()+7*24*60*60*1000,
            maxAge:Date.now()+7*24*60*60*1000,
            httpOnly:true
          }
        }));
        app.use(flash());    

//middleware for password
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
  res.locals.successMsg= req.flash('success');
  res.locals.errMsg= req.flash('error');
  res.locals.currentUser=req.user;
  next();
})
app.use('/listing',listingRouter);
app.use('/',reviewRouter);
app.use('/',signupRouter);

app.get('/',(req,res)=>{
  res.redirect('/listing');
})
 
 
main()
.then(()=>{
    console.log("Connected with dataBase");
})
.catch(err => console.log(err));
async function main() {
        //  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    await mongoose.connect(dbUrl);
}
app.listen(8080,()=>{
    console.log("App is listening at port 8080");
});