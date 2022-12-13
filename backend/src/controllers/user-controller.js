const jwt = require('jsonwebtoken')

const userHelper = require('../helpers/user-helper')

const { User } = require('../models/user-model')


const signup = async (req, res) => {
    req.body.status = userHelper.userStatus.pending

    // Validate email and password
    const { error } = userHelper.validateUser(req.body)
    if (error) return res.status(400).send({
        "status": "failure",
        "message": error.details[0].message
    })

    // Validate uniqueness of username and email
    const user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
    if (user) return res.status(400).send({
        "status": "failure",
        "message": "User has already signed up"
    })


    req.body.password = await userHelper.hashPassword(req.body.password)

    // Handle DB insertion
    const newUser = new User(req.body)
    try {
        await newUser.save()

        const token = userHelper.createToken({ 
            "id": newUser._id, 
            "username": newUser.username, 
            "email": newUser.email 
        })

        res.status(201).send({
            "status": "success",
            "message": "User has been created successfully",
            "token": token
        })
    } catch (err) {
        res.status(500).send({
            "status": "failure",
            "message": "Internal server error"
        })
    }
}

module.exports = { signup }
