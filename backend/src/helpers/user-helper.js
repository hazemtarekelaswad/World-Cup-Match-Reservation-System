const jwt = require('jsonwebtoken')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const config = require('../config/config')

const userStatus = {
    pending: "pending",
    approved: "approved"
}

const hashPassword = async (password) => await bcrypt.hash(password, 10)

const comparePassword = async (password, hash) => await bcrypt.compare(password, hash)

const createToken = (user) => jwt.sign(user, config.auth.privateKey)

const validateUserSignup = (userData) => {
    const schema = Joi.object({
        username: Joi.string().trim().min(1).max(100).required(),
        password: Joi.string().min(8).max(50).required(),
        firstName: Joi.string().trim().min(1).max(100).required(),
        lastName: Joi.string().trim().min(1).max(100).required(),
        birthDate: Joi.date().required(),
        gender: Joi.string().trim().uppercase().valid('M', 'F').required(),
        nationality: Joi.string().trim().min(1).max(100),
        email: Joi.string().lowercase().email().required(),
        role: Joi.string().trim().lowercase().valid('fan', 'manager', 'admin').required(),
        status: Joi.string().trim().lowercase().valid('pending', 'approved').required(),
    })
    return schema.validate(userData)
}

const validateUserSignin = (userData) => {
    const schema = Joi.object({
        username: Joi.string().trim().min(1).max(100).required(),
        password: Joi.string().min(8).max(50).required(),
    })
    return schema.validate(userData)
}

const validateUserUpdate = (userData) => {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(1).max(100),
        lastName: Joi.string().trim().min(1).max(100),
        password: Joi.string().min(8).max(50),
        birthDate: Joi.date(),
        gender: Joi.string().trim().uppercase().valid('M', 'F'),
        nationality: Joi.string().trim().min(1).max(100),
    })
    return schema.validate(userData)
}

const validateSeatReservation = (reservationInfo) => {
    const schema = Joi.object({
        matchId: Joi.string().trim().required(),
        seats: Joi.array().items(
            Joi.object({
                seatColumn: Joi.number().integer().positive().required(),
                seatRow: Joi.number().integer().positive().required(),
            }).required()
        ).required(),
        creditCard: Joi.string().trim().required(),
        pinNumber: Joi.number().integer().positive().required(),
    })
    return schema.validate(reservationInfo)
}

const validateSeatCancellation = (reservationInfo) => {
    const schema = Joi.object({
        matchId: Joi.string().trim().required(),
        seatColumn: Joi.number().integer().positive().required(),
        seatRow: Joi.number().integer().positive().required(),
    })
    return schema.validate(reservationInfo)
}


const validatePasswordUpdate = (passwordsInfo) => {
    const schema = Joi.object({
        oldPassword: Joi.string().min(8).max(50),
        newPassword: Joi.string().min(8).max(50)
    })
    return schema.validate(passwordsInfo)
}

module.exports = {
    userStatus,
    hashPassword,
    comparePassword,
    createToken,
    validateUserSignup,
    validateUserSignin,
    validateUserUpdate,
    validateSeatReservation,
    validateSeatCancellation,
    validatePasswordUpdate
}