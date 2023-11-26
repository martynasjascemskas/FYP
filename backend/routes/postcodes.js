const express = require('express')
const {
    getAllPostcodes,
    getSinglePostcode
} = require('../controllers/postcodeController')
const router = express.Router()


//get all postcodes
router.get('/', getAllPostcodes)

//get single postcode
router.get('/:id', getSinglePostcode)

module.exports = router