const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')
const mongoose = require('mongoose')


const userHelper = require('../helpers/user-helper')

const { User } = require('../models/user-model')
const { Match } = require('../models/match-model')
const { Stadium } = require('../models/stadium-model')

const signup = async (req, res) => {
    req.body.status = userHelper.userStatus.pending

    // Validate all user data
    const { error } = userHelper.validateUserSignup(req.body)
    if (error) return res.status(400).send({
        "status": "failure",
        "message": error.details[0].message
    })

    // Validate uniqueness of username and email
    const user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
    if (user) return res.status(400).send({
        "status": "failure",
        "message": "User is already signed up"
    })


    req.body.password = await userHelper.hashPassword(req.body.password)

    // Handle DB insertion
    const newUser = new User(req.body)
    try {
        await newUser.save()
        res.status(201).send({
            "status": "success",
            "message": "User has been created successfully"
        })
    } catch (err) {
        res.status(500).send({
            "status": "failure",
            "message": "Internal server error"
        })
    }
}

const signin = async (req, res) => {

    // Validate username and password
    const { error } = userHelper.validateUserSignin(req.body)
    if (error) return res.status(400).send({
        "status": "failure",
        "message": error.details[0].message
    })

    // Validate username existance
    const user = await User.findOne({ username: req.body.username })

    if (!user) return res.status(403).send({
        "status": "failure",
        "message": "Username is incorrect"
    })

    // Validate password correctness
    const isEqual = await userHelper.comparePassword(req.body.password, user.password)    
    if (!isEqual) return res.status(401).send({
        "status": "failure",
        "message": "Password is incorrect"
    })

    // Validate pending status
    if (user.status === userHelper.userStatus.pending) return res.status(401).send({
        "status": "failure",
        "message": "User is in pending status"
    })

    // Create token and send it
    const token = userHelper.createToken({ 
        "_id": user._id, 
        "username": user.username, 
        "email": user.email,
        "role": user.role
    })

    res.status(200).send({
        "status": "success",
        "message": "User signed in successfully",
        "token": token
    })
}

const getUser = async (req, res) => {
    const user = await User.findOne({ _id: req.authUser._id })

    // Verify if the user is not found
    if (!user) return res.status(400).send({
        "status": "failure",
        "message": "User does not exist in the system"
    })

    // Success, send the user's data
    // TODO: extract all reserved matches to send them along with user data

    // matchesToSend = 
    userToSend = { 
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        gender: user.gender,
        nationality: user.nationality,
        email: user.email,
        role: user.role,
        matches: user.matches
    }
    res.status(200).send(userToSend)


}

const updateUser = async (req, res) => {

    // Validate the request body
    const { error } = userHelper.validateUserUpdate(req.body)
    if (error) return res.status(400).send({
        "status": "failure",
        "message": error.details[0].message
    })

    // Update the user
    const user = await User.findOneAndUpdate({ _id: req.authUser._id }, { $set: req.body })
    if (!user) return res.status(400).send({
        "status": "failure",
        "message": "User does not exist in the system"
    })

    res.status(201).send({
        "status": "success",
        "message": "User has been updated successfully"
    })
    
}


const reserveSeat = async (req, res) => {
    // validate the role of fan in order to reserve the seat
    if (req.authUser.role != "fan") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a fan"
    })

    // validate incoming body
    const { error } = userHelper.validateSeatReservation(req.body)
    if (error) return res.status(400).send({
        "status": "failure",
        "message": error.details[0].message
    })

    req.body.matchId = mongoose.Types.ObjectId(req.body.matchId)

    // validate duplicate seat in the same match
    const user = await User.findOne({ _id: req.authUser._id })
    if (!user) return res.status(400).send({
        "status": "failure",
        "message": "User does not exist in the system"
    })

    const currMatch = await Match.findOne({ _id: req.body.matchId })
    if (!currMatch) return res.status(400).send({
        "status": "failure",
        "message": "Match does not exist in the system"
    })

    for (let match of user.matches) {
        if (match.matchId.equals(req.body.matchId) && match.seatColumn == req.body.seatColumn && match.seatRow == req.body.seatRow) 
            return res.status(400).send({
                "status": "failure",
                "message": "You have already reserved this seat"
            })
        
        // // validate that you haven't reserved any match at the same time of this match
        // const matchData = await Match.findOne({ _id: match.matchId })
        // if (matchData.date.getTime() == currMatch.date.getTime()) return res.status(400).send({
        //     "status": "failure",
        //     "message": "You have reserved another match at the same time. They will be clashing matches"
        // })
        
    }

    // validate future match
    if (currMatch.date.getTime() < Date.now()) return res.status(400).send({
        "status": "failure",
        "message": "Match has already finished"
    })
    
    // validate the if the seat is correct based on the stadium shape
    const currStadium = await Stadium.findOne({ _id: currMatch.stadium })
    if (!currStadium) return res.status(400).send({
        "status": "failure",
        "message": "Stadium does not exist in the system"
    })

    if (req.body.seatColumn >= currStadium.columnsCount || req.body.seatRow >= currStadium.rowsCount)
        return res.status(400).send({
            "status": "failure",
            "message": "seatColumn or seatRow is out of range"
        })
    
    // validate vacant seat
    for (let fan of currMatch.fans) {
        if (fan.seatColumn == req.body.seatColumn && fan.seatRow == req.body.seatRow) 
            return res.status(400).send({
                "status": "failure",
                "message": "This seat is reserved"
            })
    }

    // Success
    try {
        await User.updateOne({ _id: user._id }, { $push: { matches: {
            "matchId": req.body.matchId,
            "seatRow": req.body.seatRow,
            "seatColumn": req.body.seatColumn
        }}})

        await Match.updateOne({ _id: currMatch._id }, { $push: { fans: {
            "fanId":  user._id,
            "seatRow": req.body.seatRow,
            "seatColumn": req.body.seatColumn
        }}})

    } catch (err) {
        res.status(500).send({
            "status": "failure",
            "message": "Internal server error"
        })
    }

    // generate unique number and send it to the user
    const ticketNumber = crypto.AES.encrypt(JSON.stringify({ 
        creditCard: req.body.creditCard, 
        pinNumber: req.body.pinNumber 
    }), "private key for credit card and pin number").toString()

    res.status(201).send({
        "ticket": ticketNumber
    })
}

const cancelSeat = async (req, res) => {
    // validate the role of fan in order to reserve the seat
    if (req.authUser.role != "fan") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a fan"
    })

    // validate incoming body
    const { error } = userHelper.validateSeatCancellation(req.body)
    if (error) return res.status(400).send({
        "status": "failure",
        "message": error.details[0].message
    })

    req.body.matchId = mongoose.Types.ObjectId(req.body.matchId)

    // validate duplicate seat in the same match
    const user = await User.findOne({ _id: req.authUser._id })
    if (!user) return res.status(400).send({
        "status": "failure",
        "message": "User does not exist in the system"
    })

    const currMatch = await Match.findOne({ _id: req.body.matchId })
    if (!currMatch) return res.status(400).send({
        "status": "failure",
        "message": "Match does not exist in the system"
    })

    let isFound = false
    for (let match of user.matches) {
        if (match.matchId.equals(req.body.matchId) && match.seatColumn == req.body.seatColumn && match.seatRow == req.body.seatRow) {
            isFound = true
            break
        }
    }

    if (!isFound) return res.status(400).send({
        "status": "failure",
        "message": "You are not the one who reserved this seat to cancel"
    })

    // If found, validate its 3 days limit
    if (currMatch.date.getTime() <= Date.now() || Math.abs(currMatch.date.getTime() - Date.now()) / (1000*3600*24) > 3) return res.status(400).send({
        "status": "failure",
        "message": "Cancellation is available only in 3 days before the match time"
    })

    // Cancel reservation by removing it from matches and remove fan from fans    
    try {
        await User.updateOne({ _id: user._id }, { $pull: { matches: {
            "matchId": req.body.matchId,
            "seatRow": req.body.seatRow,
            "seatColumn": req.body.seatColumn
        }}})

        await Match.updateOne({ _id: currMatch._id }, { $pull: { fans: {
            "fanId":  user._id,
            "seatRow": req.body.seatRow,
            "seatColumn": req.body.seatColumn
        }}})

        res.status(201).send({
            "status": "success",
            "message": "Cancelled successfully"
        })

    } catch (err) {
        res.status(500).send({
            "status": "failure",
            "message": "Internal server error"
        })
    }

    

}

module.exports = { 
    signup,
    signin,
    getUser,
    updateUser,
    reserveSeat,
    cancelSeat
}
