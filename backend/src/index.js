const express = require('express')
const mongoose = require('mongoose');

const config = require('./config/config')

const app = express()

mongoose.connect(config.database.connection).then(() => { console.log('Connected successfully to DB') })



app.listen(config.server.port, () => { console.log(`Starting server on port ${config.server.port}`) })
