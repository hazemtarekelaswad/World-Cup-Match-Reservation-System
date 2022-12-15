const mongoose = require('mongoose')

const ReservedMatchSchema = new mongoose.Schema({
    matchId: {
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

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 1
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    birthDate: {
        type: Date,         // 'yyyy-mm-dd' 
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F'],
        trim: true,
        minLength: 1,
        maxLength: 1,
        uppercase: true,
    },
    nationality: {
        type: String,
        required: false,
        trim: true,
        minLength: 1,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (email) => {
                const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                return regex.test(email)
            }
        }
    },
    role: {
        type: String,
        required: true,
        enum: ['fan', 'manager', 'admin'],
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved'],
        trim: true
    },
    matches: {
        type: [ReservedMatchSchema]
    }
})

const User = mongoose.model('User', UserSchema)


// Export models
module.exports = { User }