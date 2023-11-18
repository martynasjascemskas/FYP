const express = require('express')
const HouseSale = require('../models/HouseSaleModel')
const router = express.Router()

//GET all houses by postcode
router.get('/', (req, res) => {
    res.json({mssg: 'GET ALL HOUSES BY POSTCODE'})
})

//GET single house
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET SINGLE HOUSE'})
})

//POST A NEW HOUSE SALE
router.post('/', async (req, res) => {
    const {price, date, postcode, type, new_build, address1, address2, address3, address4, address5, address6, address7} = req.body
    
    try{
        const houseSale = await HouseSale.create({price, date, postcode, type, new_build, address1, address2, address3, address4, address5, address6, address7})
        res.status(200).json(houseSale)
    } catch(error){
        res.status(400).json({error: error.message})
    }
})

//DELETE A HOUSE SALE
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE A HOUSE SALE'})
})

//UPDATE A HOUSE SALE
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE A HOUSE SALE'})
})

module.exports = router