const jwt = require('jsonwebtoken')
const config = require('../config/config')

const verifyToken = (req, res, next) => {
    const token = req.header('Token')
    if (!token) return res.status(401).send({
        "status": "failure",
        "message": "Unauthorized request, provide a token"
    })

    jwt.verify(token, config.auth.privateKey, (err, usr) => {
        if (err) return res.status(403).send({
            "status": "failure",
            "message": "Permission denied, invalid token"
        })

        req.authUser = usr
        console.log(usr)
        next()
    })
}

module.exports = {
    verifyToken
}