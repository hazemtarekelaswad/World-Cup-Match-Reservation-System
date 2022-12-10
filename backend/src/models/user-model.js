const mongoose = require('mongoose')

const ReservedMatchSchema = new mongoose.mongoose.Schema({
    matchId: {
        type: mongoose.Schema.Types.ObjectId
    },
    seatRow: {
        type: Number,
    },
    seatColumn: {
        type: Number
    }
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    matches: {
        type: [ReservedMatchSchema]
    }
})

const User = mongoose.model('User', UserSchema)


// Export models
module.exports = {
    User: User
}