const mongoose = require('mongoose')

const fanSchema = new mongoose.mongoose.Schema({
    fanId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seatRow: {
        type: Number,
        required: true
    },
    seatColumn: {
        type: Number,
        required: true
    }
})

const MatchSchema = new mongoose.Schema({
    firstTeam: {
        type: String,
        required: true
    },
    secondTeam: {
        type: String,
        required: true
    },
    stadium: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date, // includes date ant time
        required: true
    },
    referee: {
        type: String,
        required: true
    },
    firstLineman: {
        type: String,
        required: false
    },
    secondLineman: {
        type: String,
        required: true
    },
    fans: {
        type: [fanSchema]
    }
})

const Match = mongoose.model('Match', MatchSchema)

// Exported models
module.exports = { Match }