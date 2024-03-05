const mongoose = require('mongoose')

const Schema = mongoose.Schema

const houseSaleSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    new_build: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
    },
    address3: {
        type: String,
        required: true
    },
    address4: {
        type: String,
        required: true
    },
    address5: {
        type: String,
        required: true
    },
    address6: {
        type: String,
        required: true
    },
    address7: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('houses_data', houseSaleSchema, 'houses_data')