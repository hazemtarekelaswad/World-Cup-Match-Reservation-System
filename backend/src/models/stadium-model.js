const mongoose = require('mongoose')

const StadiumSchema = new mongoose.mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    columnsCount: {
        type: Number,
        required: true
    },
    rowsCount: {
        type: Number,
        required: true
    }
})

const Stadium = mongoose.model('Stadium', StadiumSchema)

// Exported models
module.exports = { Stadium }