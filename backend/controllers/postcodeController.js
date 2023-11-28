const postcodeModel = require('../models/postcodeModel')
const mongoose = require('mongoose')

const getAllPostcodes = async (req, res) => {
    const postcodes = await postcodeModel.find({}).limit(100000) 
    const filtered = postcodes.map(postcode => ({
        postcode: postcode.pcds,
        lat: postcode.lat,
        long: postcode.long
    }))
    res.status(200).json(filtered)
    //res.status(200).json(postcodes)
}

const getSinglePostcode = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such postcode id.'})
    }

    const postcodes = await postcodeModel.findById(id)

    if(!postcodes){
        return res.status(404).json({error: 'No such postcode'})
    }

    res.status(200).json(postcodes)
}

module.exports = {
    getAllPostcodes,
    getSinglePostcode
}