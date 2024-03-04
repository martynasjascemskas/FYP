require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const postcodesRoutes = require('./routes/postcodes')
const houseRoutes = require('./routes/houses')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/postcodes', postcodesRoutes)
app.use('/api/houses', houseRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

/*
HOUSES:
GET HOUSES BY POSTCODE
(MAYBE) GET HOUSE INFO BY ID
(MAYBE) CREATE NEW HOUSE SALE

POSTCODES:
GET ALL POSTCODES
(MAYBE) GET 1 POSTCODE INFO BY ID

*/