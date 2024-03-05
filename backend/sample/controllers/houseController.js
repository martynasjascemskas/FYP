const HouseSale = require("../models/HouseSaleModel");
const mongoose = require("mongoose");

//get all house sales for postcode
const getHousesSoldByPostcode = async (req, res) => {
  const { postcode } = req.query;
  console.log(postcode);
  const houseSales = await HouseSale.find({ postcode })
    .sort({ date: -1 })
    .limit(200);

  if (!houseSales || houseSales.length === 0) {
    return res
      .status(404)
      .json({ error: "No house sales found for given postcode." });
  }

  res.status(200).json(houseSales);
};

//get all house sales for postcode selected
//{postcode: {$in:["AL9 7EB","SE10 9EB","NG31 8NQ"]}}
const getHousesSoldByPostcodeSelected = async (req, res) => {
  const selectedArea = req.body.selectedArea.replace(/\[|\]/g, "").split(",");
  console.log(selectedArea);
  const houseSales = await HouseSale.find({
    postcode: { $in: selectedArea },
  })
    .sort({ date: -1 })
    .limit(1000);

  if (!houseSales || houseSales.length === 0) {
    return res.status(404).json({
      error: "No house sales found for given selected postcode area.",
    });
  }

  res.status(200).json(houseSales);
};

//get single house sale
const getHouseSale = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such house sale id." });
  }

  const houseSale = await HouseSale.findById(id);

  if (!houseSale) {
    return res.status(404).json({ error: "No such house sale" });
  }

  res.status(200).json(houseSale);
};

//create new house sale
const createHouseSale = async (req, res) => {
  const {
    price,
    date,
    postcode,
    type,
    new_build,
    address1,
    address2,
    address3,
    address4,
    address5,
    address6,
    address7,
  } = req.body;

  //add doc to db.
  try {
    const houseSale = await HouseSale.create({
      price,
      date,
      postcode,
      type,
      new_build,
      address1,
      address2,
      address3,
      address4,
      address5,
      address6,
      address7,
    });
    res.status(200).json(houseSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete a house sale
const deleteHouseSale = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such house sale id." });
  }

  const houseSale = await HouseSale.findOneAndDelete({ _id: id });

  if (!houseSale) {
    return res.status(404).json({ error: "No such house sale" });
  }

  res.status(200).json(houseSale);
};
//update a house sale
const updateHouseSale = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such house sale id." });
  }

  const houseSale = await HouseSale.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!houseSale) {
    return res.status(404).json({ error: "No such house sale" });
  }

  res.status(200).json(houseSale);
};
module.exports = {
  createHouseSale,
  getHousesSoldByPostcode,
  getHousesSoldByPostcodeSelected,
  getHouseSale,
  deleteHouseSale,
  updateHouseSale,
};
