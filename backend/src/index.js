// Modules
const express = require('express')
const mongoose = require('mongoose');

// Configs
const config = require('./config/config')

// Routes
const userRoute = require('./routes/user-route')
const matchRoute = require('./routes/match-route')
const stadiumRoute = require('./routes/stadium-route')

// Initializations
const app = express()

// DB Connection
mongoose.connect(config.database.connection).then(() => { console.log('Connected successfully to DB') })

// Middlewares
app.use(express.json())
app.use(userRoute)
app.use(matchRoute)
app.use(stadiumRoute)



// Starting the server
app.listen(config.server.port, () => { console.log(`Starting server on port ${config.server.port}`) })
