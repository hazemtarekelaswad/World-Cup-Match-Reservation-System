// Modules
const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors');

// Configs
const config = require('./config/config')

// Routes
const userRoute = require('./routes/user-route')
const matchRoute = require('./routes/match-route')
const stadiumRoute = require('./routes/stadium-route')
const adminRoute = require('./routes/admin-route')

// Initializations
const app = express();
app.use(cors());

// DB Connection
mongoose.connect(config.database.connection).then(() => { console.log('Connected successfully to DB') })

// Middlewares
app.use(express.json())
app.use(cors())
app.use(userRoute)
app.use(matchRoute)
app.use(stadiumRoute)
app.use(adminRoute)



// Starting the server
app.listen(config.server.port, () => { console.log(`Starting server on port ${config.server.port}`) })
