const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(listingController.index) //Index
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    listingController.createListing
  ); //Create

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(listingController.showListing) //Show
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    listingController.updateListing
  ) //Update
  .delete(isLoggedIn, isOwner, listingController.destroyListing); //Delete

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;
