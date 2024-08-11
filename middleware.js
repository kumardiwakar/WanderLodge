
const Listing = require('./models/listing.js');
const Review=require('./models/rivew.js')
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl
        req.flash('error','Please logged in to create listing');
       return res.redirect('/login');
    }
    next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params
    let listing=await Listing.findById(id);
    console.log(res.locals.currentUser)
    if(!listing.owner.equals(res.locals.currentUser._id)){
      req.flash('error','You dont have permission to edit/delete');
      return res.redirect('/listing/'+id)
    }
    next();
}
module.exports.isrevieAuthor=async (req,res,next)=>{
    let {id,reviewid}=req.params
    let review=await Review.findById(reviewid);
    console.log(res.locals.currentUser)
    if(!review.author.equals(res.locals.currentUser._id)){
      req.flash('error','You are not author of this review');
      console.log("redirecting")
      console.log(`/listing/${id}/review/${reviewid}`)
      return res.redirect(`/listing/${id}`);
    }
    next();
}