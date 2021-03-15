const path = require('path')
const log = require('./utils/log')

require('dotenv/config')
require('colors')

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 8080

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
}, log.databaseConnection)

app.use('/', express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(port, log.init)