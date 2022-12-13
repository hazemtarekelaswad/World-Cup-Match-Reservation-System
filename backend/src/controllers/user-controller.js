const jwt = require('jsonwebtoken')

const userHelper = require('../helpers/user-helper')

const { User } = require('../models/user-model')

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
        "id": user._id, 
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

module.exports = { 
    signup,
    signin
}
