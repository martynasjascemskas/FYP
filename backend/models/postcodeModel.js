const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postcodeSchema = new Schema({
  pcds: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  median_price_all_years: {
    type: Number,
    required: true,
  },
  median_price_2015: {
    type: Number,
    required: true,
  },
  median_price_2016: {
    type: Number,
    required: true,
  },
  median_price_2017: {
    type: Number,
    required: true,
  },
  median_price_2018: {
    type: Number,
    required: true,
  },
  median_price_2019: {
    type: Number,
    required: true,
  },
  median_price_2020: {
    type: Number,
    required: true,
  },
  median_price_2021: {
    type: Number,
    required: true,
  },
  median_price_2022: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("postcodes", postcodeSchema, "postcodes");
