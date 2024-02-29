const express = require("express");
const {
  getAllPostcodes,
  getSinglePostcode,
  getAllPostcodesWithoutView,
} = require("../controllers/postcodeController");
const router = express.Router();

//get all postcodes
router.get("/", getAllPostcodes);
//get all postcodes without viewbounds
router.get("/withoutview/", getAllPostcodesWithoutView);
//get single postcode
router.get("/:id", getSinglePostcode);

module.exports = router;
