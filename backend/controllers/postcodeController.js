const postcodeModel = require("../models/postcodeModel");
const mongoose = require("mongoose");

const getAllPostcodes = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  const postcodes = await postcodeModel
    .find({
      pcds: { $exists: true },
      avg_price_all_years: {
        $gte: minPrice,
        $lte: maxPrice >= 500000 ? Number.MAX_SAFE_INTEGER : maxPrice,
      },
      lat: { $gte: 51.75173, $lte: 51.75726 },
      long: { $gte: -0.34922, $lte: -0.32676 },
    })
    .limit(5000)
    .lean();
  // console.log(postcodes);
  const filtered = postcodes.map((postcode) => ({
    _id: postcode._id,
    postcode: postcode.pcds,
    lat: postcode.lat,
    long: postcode.long,
    avg_price_all_years: postcode.avg_price_all_years,
    avg_price_2015: postcode.avg_price_2015,
    avg_price_2016: postcode.avg_price_2016,
    avg_price_2017: postcode.avg_price_2017,
    avg_price_2018: postcode.avg_price_2018,
    avg_price_2019: postcode.avg_price_2019,
    avg_price_2020: postcode.avg_price_2020,
    avg_price_2021: postcode.avg_price_2021,
    avg_price_2022: postcode.avg_price_2022,
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
};
