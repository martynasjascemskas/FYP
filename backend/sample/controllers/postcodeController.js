const postcodeModel = require("../models/postcodeModel");
const mongoose = require("mongoose");

const getAllPostcodes = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  const currentView = req.query.currentView
    .replace(/\[|\]/g, "")
    .split(",")
    .map(parseFloat);
  console.log(
    currentView[0] +
      " " +
      currentView[1] +
      " " +
      currentView[2] +
      " " +
      currentView[3]
  );
  const postcodes = await postcodeModel
    .find({
      pcds: { $exists: true },
      median_price_all_years: {
        $gte: minPrice,
        $lte: maxPrice >= 500000 ? Number.MAX_SAFE_INTEGER : maxPrice,
      },
      lat: { $gte: currentView[2], $lte: currentView[0] },
      long: { $gte: currentView[3], $lte: currentView[1] },
    })
    .limit(10000)
    .lean();
  const filtered = postcodes.map((postcode) => ({
    _id: postcode._id,
    postcode: postcode.pcds,
    lat: postcode.lat,
    long: postcode.long,
    median_price_all_years: postcode.median_price_all_years,
    median_price_2018: postcode.median_price_2018,
    median_price_2019: postcode.median_price_2019,
    median_price_2020: postcode.median_price_2020,
    median_price_2021: postcode.median_price_2021,
    median_price_2022: postcode.median_price_2022,
  }));
  res.status(200).json(filtered);
  //res.status(200).json(postcodes);
};

const getAllPostcodesWithoutView = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  const postcodes = await postcodeModel
    .find({
      pcds: { $exists: true },
      median_price_all_years: {
        $gte: minPrice,
        $lte: maxPrice >= 500000 ? Number.MAX_SAFE_INTEGER : maxPrice,
      },
    })
    .limit(5000)
    .lean();
  const filtered = postcodes.map((postcode) => ({
    _id: postcode._id,
    postcode: postcode.pcds,
    lat: postcode.lat,
    long: postcode.long,
    median_price_all_years: postcode.median_price_all_years,
    median_price_2018: postcode.median_price_2018,
    median_price_2019: postcode.median_price_2019,
    median_price_2020: postcode.median_price_2020,
    median_price_2021: postcode.median_price_2021,
    median_price_2022: postcode.median_price_2022,
  }));
  res.status(200).json(filtered);
  //res.status(200).json(postcodes);
};

const getSinglePostcode = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such postcode id." });
  }

  const postcodes = await postcodeModel.findById(id);

  if (!postcodes) {
    return res.status(404).json({ error: "No such postcode" });
  }

  res.status(200).json(postcodes);
};

module.exports = {
  getAllPostcodes,
  getSinglePostcode,
  getAllPostcodesWithoutView,
};
