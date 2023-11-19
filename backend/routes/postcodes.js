const express = require('express')
const router = express.Router()


//get all postcodes
router.get('/', (req, res) => {
    res.json({mssg: 'GET ALL POSTCODES'})
})

//get single postcode
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET SINGLE POSTCODE'})
})

//POST A NEW postcode SALE

module.exports = router