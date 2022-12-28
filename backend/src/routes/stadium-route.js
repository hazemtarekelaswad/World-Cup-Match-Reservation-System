const express = require('express')
const router = express.Router()
const { Stadium } = require('../models/stadium-model')
const auth = require('../middlewares/auth')



// TODO: Handle HTTP requests

 router.post('/stadium', auth.verifyToken, async (req, res) => {
    // validate the role of manager
    if (req.authUser.role != "manager") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a manager"
    })

     const newStadium = new Stadium(req.body)
     console.log("🚀 ~ file: stadium-route.js:10 ~ router.post ~ newStadium", newStadium)
     try {
         await newStadium.save()
         res.status(200).send({
            "status": "success",
            "message": "Stadium created successfully"
        })
     } catch (err) {
         res.status(500).send({
            "status": "failure",
            "message": "Internal server error"
        })
     }
 })


module.exports = router