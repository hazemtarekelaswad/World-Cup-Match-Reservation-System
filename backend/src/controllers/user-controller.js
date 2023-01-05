const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')
const mongoose = require('mongoose')

const userHelper = require('../helpers/user-helper')

const { User } = require('../models/user-model')
const { Match } = require('../models/match-model')
const { Stadium } = require('../models/stadium-model')
const { Team } = require('../models/team-model')


const signup = async (req, res) => {
    
    if (!("role" in req.body)) return res.status(400).send({
        "status": "failure",
        "message": "Provide a role (manager, fan, admin)"
    })

    req.body.status = (req.body.role === "manager") ? userHelper.userStatus.pending : userHelper.userStatus.approved

    if ("nationality" in req.body && req.body["nationality"] === "") delete req.body["nationality"]
    
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
    userToSend = { 
        userId: user._id,
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

    if ("nationality" in req.body && req.body["nationality"] === "") delete req.body["nationality"]


    // Validate the request body
    const { error } = userHelper.validateUserUpdate(req.body)
    if (error) return res.status(400).send({
        "status": "failure",
        "message": error.details[0].message
    })

    // Update the user
    if ("password" in req.body) req.body.password = await userHelper.hashPassword(req.body.password)

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

const updatePassword = async (req, res) => {
    // Validate the request body
    const { error } = userHelper.validatePasswordUpdate(req.body)
    if (error) return res.status(400).send({
        "status": "failure",
        "message": error.details[0].message
    })


    const user = await User.findOne({ _id: req.authUser._id })

    // Verify if the user is not found
    if (!user) return res.status(400).send({
        "status": "failure",
        "message": "User does not exist in the system"
    })
    

    // Validate password correctness
    const isEqual = await userHelper.comparePassword(req.body.oldPassword, user.password)    
    if (!isEqual) return res.status(401).send({
        "status": "failure",
        "message": "Password is incorrect"
    })

    req.body.newPassword = await userHelper.hashPassword(req.body.newPassword)

    const updatedUser = await User.findOneAndUpdate({ _id: req.authUser._id }, { $set: { "password": req.body.newPassword } })
    if (!updatedUser) return res.status(400).send({
        "status": "failure",
        "message": "User does not exist in the system"
    })

    res.status(201).send({
        "status": "success",
        "message": "User's password has been updated successfully"
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
        for (let seat of req.body.seats) {

            if (match.matchId.equals(req.body.matchId) && match.seatColumn == seat.seatColumn && match.seatRow == seat.seatRow) 
                return res.status(400).send({
                    "status": "failure",
                    "message": "You have already reserved one of these seats"
                })
            
            // validate that you haven't reserved any match at the same time of this match
            const matchData = await Match.findOne({ _id: match.matchId })
            if (!match.matchId.equals(req.body.matchId) && matchData.date.getTime() == currMatch.date.getTime()) 
                return res.status(400).send({
                    "status": "failure",
                    "message": "You have reserved another match at the same time. They will be clashing matches"
                })    
        }
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

    for (let seat of req.body.seats) {
        if (seat.seatColumn >= currStadium.columnsCount || seat.seatRow >= currStadium.rowsCount)
        return res.status(400).send({
            "status": "failure",
            "message": "One of the seats is out of range (seatRow or seatColumn is out of the stadium shape)"
        })
    }
    
    // validate vacant seat
    for (let fan of currMatch.fans) {
        for (let seat of req.body.seats) {
            if (fan.seatColumn == seat.seatColumn && fan.seatRow == seat.seatRow) 
                return res.status(400).send({
                    "status": "failure",
                    "message": "One of the seats is already reserved"
                })
        }
    }

    // Success
    try {
        for (let seat of req.body.seats) {
            await User.updateOne({ _id: user._id }, { $push: { matches: {
                "matchId": req.body.matchId,
                "seatRow": seat.seatRow,
                "seatColumn": seat.seatColumn
            }}})

            await Match.updateOne({ _id: currMatch._id }, { $push: { fans: {
                "fanId":  user._id,
                "seatRow": seat.seatRow,
                "seatColumn": seat.seatColumn
            }}})
        }

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

const getReservations = async (req, res) => {
    // validate the role of fan in order to reserve the seat
    if (req.authUser.role != "fan") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a fan"
    })

    const user = await User.findOne({ _id: req.authUser._id })
    if (!user) return res.status(400).send({
        "status": "failure",
        "message": "User does not exist in the system"
    })

    let matchesToSend = []
    let hashSet = {}
    for (let reservedMatch of user.matches) {
        const matchDetails = await Match.findById(reservedMatch.matchId)
        if (matchDetails._id.toString() in hashSet) continue;
        hashSet[matchDetails._id.toString()] = 0
        const stadium = await Stadium.findById(matchDetails.stadium)
        
        let matchToSend = {
            matchId: matchDetails._id,
            firstTeam: matchDetails.firstTeam,
            secondTeam: matchDetails.secondTeam,
            stadium: {
                name: stadium.name,
                columnsCount: stadium.columnsCount,
                rowsCount: stadium.rowsCount
            },
            date: matchDetails.date,
            referee: matchDetails.referee,
            firstLineman: matchDetails.firstLineman,
            secondLineman: matchDetails.secondLineman,
        }

        let seats = []
        for (let fan of matchDetails.fans) {
            if (fan.fanId.equals(req.authUser._id)) {
                seats.push({
                    seatRow: fan.seatRow,
                    seatColumn: fan.seatColumn
                })
            }
        }
        matchToSend["seats"] = seats
        matchesToSend.push(matchToSend)
    }

    res.status(200).send({ "reservations": matchesToSend })
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

    // let isFound = false
    // for (let match of user.matches) {
    //     if (match.matchId.equals(req.body.matchId) && match.seatColumn == req.body.seatColumn && match.seatRow == req.body.seatRow) {
    //         isFound = true
    //         break
    //     }
    // }

    // if (!isFound) return res.status(400).send({
    //     "status": "failure",
    //     "message": "You are not the one who reserved this seat to cancel"
    // })

    // If found, validate its 3 days limit
    if (currMatch.date.getTime() <= Date.now()) return res.status(400).send({
        "status": "failure",
        "message": "The match has already finished"
    })

    if (Math.abs(currMatch.date.getTime() - Date.now()) / (1000*3600*24) <= 3) return res.status(400).send({
        "status": "failure",
        "message": "You can not cancel a reservation in any of the three days before the match"
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

const getTeams = async (req, res) => {
    // if (req.authUser.role != "manager") return res.status(403).send({
    //     "status": "failure",
    //     "message": "Forbidden access. Must be a manager"
    // })

    const teams = await Team.find()
    teamsToSend = []
    for (let team of teams) teamsToSend.push({name: team.name})
    res.status(200).send({"teams": teamsToSend})
}



module.exports = { 
    signup,
    signin,
    getUser,
    updateUser,
    reserveSeat,
    getReservations,
    cancelSeat,
    getTeams,
    updatePassword
}

