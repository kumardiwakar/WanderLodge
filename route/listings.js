const express=require('express');
const router=express.Router();
const {isrevieAuthor}=require('../middleware.js');
const listingController=require('../controllers/listings.js');
const passport = require('passport');
const { isLoggedIn, isOwner } = require('../middleware.js');
router.use(passport.initialize());
router.use(passport.session());

router.route('/')
.get(listingController.index)
.post(isLoggedIn,listingController.postNewListingForm);

   router.get('/new',isLoggedIn,listingController.renderNewlistingForm);

   router.get('/:id/edit',listingController.editListingForm);

router.route('/:id')
.put(isLoggedIn,isOwner,listingController.putEditListingForm)
.delete(isLoggedIn,isOwner,listingController.deleteListing)
.get(listingController.showListing)
  module.exports = router;