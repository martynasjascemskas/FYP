const express = require("express");
const {
  createHouseSale,
  getHousesSoldByPostcode,
  getHousesSoldByPostcodeSelected,
  getHouseSale,
  deleteHouseSale,
  updateHouseSale,
} = require("../controllers/houseController");
const router = express.Router();

//GET all houses by postcode
router.get("/postcode", getHousesSoldByPostcode);

//GET all houses by postcode selected (POST being used to avoid limit of GET requests)
router.post("/postcode/selected", getHousesSoldByPostcodeSelected);

//GET single house
router.get("/:id", getHouseSale);

//POST A NEW HOUSE SALE
router.post("/", createHouseSale);

//DELETE A HOUSE SALE
router.delete("/:id", deleteHouseSale);

//UPDATE A HOUSE SALE
router.patch("/:id", updateHouseSale);

module.exports = router;
