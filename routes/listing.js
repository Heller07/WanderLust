const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")

const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js")
const multer  = require('multer');//for parsing multiformdata

const {storage} = require("../cloudConfig.js");
const upload = multer({storage});//currently we are saving files in uploads folder
//index and create route merged
router
    .route("/")
    .get(wrapAsync (listingController.index))
    .post(isLoggedIn, upload.single("listing[image]"),wrapAsync (listingController.createListing));

//NEW ROUTE ALWAYS ABOVE TO THE SHOW ROUTE
router.get("/new", isLoggedIn,listingController.rennderNewForm);

//Show,Delete and Update route merged
router.route("/:id")
    .get(wrapAsync (listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single("listing[image]") ,validateListing, wrapAsync (listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync (listingController.destroyListing));

//Edit Route
router.get("/:id/edit",isOwner,isLoggedIn, wrapAsync (listingController.renderEditForm));


module.exports = router;