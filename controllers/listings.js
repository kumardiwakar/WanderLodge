const Listing = require('../models/listing.js');
module.exports.index=async (req,res)=>{
    let allListing=await Listing.find();
    if(!allListing){
      req.flash('error','Listing you requested for does not exist');
    }
    res.render('listing/index.ejs',{allListing});
   };
   module.exports.renderNewlistingForm=(req,res)=>{
    res.render('listing/new.ejs');
   };
   module.exports.postNewListingForm=async (req,res)=>{
    let {title,description,image,price,location,country}=req.body;
    let list=new Listing({title:title,description:description,image:image,price:price,location:location,country:country});
    list.owner=req.user._id;
    await list.save();
    req.flash('success','Listing is added');
    res.redirect('/listing');
   }
   module.exports.editListingForm=async(req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    if(list==null){
      req.flash('error','Listing you requested for does not exist');
      console.log("list does not exist");
    }else{
      req.flash('success','Listing is edited');
      res.render('listing/edit.ejs',{list});
    }
   }
   module.exports.putEditListingForm=async (req,res)=>{
    let {id}=req.params
    let {title,description,image,price,location,country}=req.body;
     await Listing.findByIdAndUpdate(id,{title:title,description:description,image:image,price:price,location:location,country:country});
     req.flash('success','listing update successfully');
     console.log("Listing does not exist");
   res.redirect('/listing/'+id);
   };
   module.exports.deleteListing=async (req,res)=>{
    const {id}=req.params;
   await Listing.findByIdAndDelete(id);
   req.flash('success','Route is deleted');
    res.redirect('/listing');
   };
   module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
   let list=await Listing.findById(id)
   .populate({path:"reviews",populate:{path:'author'}})
   .populate('owner');
   if(list==null){
    req.flash('error','Listing you requested for does not exist');
    res.redirect('./');
   }else{
    res.render('listing/show.ejs',{list});
   } 
  }