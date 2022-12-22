const mongoose = require('mongoose')

const teamSchema = new mongoose.mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Team = mongoose.model('Team', teamSchema)

// Exported models
module.exports = { Team }