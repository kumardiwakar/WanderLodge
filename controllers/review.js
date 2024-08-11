const Rivew=require('../models/rivew.js');
const Listing = require('../models/listing.js');
module.exports.postReview= async (req,res)=>{
    const {id}=req.params;
    let {rating,comments}=req.body;
    let rivew=new Rivew({rating:rating,comment:comments});
    rivew.author=req.user._id;
    let  updatelisting=await Listing.findById(id);
    updatelisting.reviews.push(rivew);
    await rivew.save();
    await updatelisting.save();
    req.flash('success','Review added');
    res.redirect('/listing/'+id);
  };
  module.exports.deleteReview= async (req,res)=>{
    let {id,reviewid}=req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
     await Rivew.findByIdAndDelete(reviewid);
     req.flash('success','Review Deleted');
    res.redirect('/listing/'+id);
  };