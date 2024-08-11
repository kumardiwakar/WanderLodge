const express=require('express');
const router=express.Router();
const reviewController=require('../controllers/review.js');
const { isLoggedIn , isrevieAuthor} = require('../middleware.js');
//post Review route
router.post("/listing/:id/review",isLoggedIn,reviewController.postReview)
  
  // Delete Review Route
  router.delete('/listing/:id/review/:reviewid',isLoggedIn,isrevieAuthor,reviewController.deleteReview)
  module.exports = router;