const express = require('express')
const router = express.Router()
const { Stadium } = require('../models/stadium-model')


// TODO: Handle HTTP requests

// router.post('/stadium', async (req, res) => {
//     const newStadium = new Stadium(req.body)
//     try {
//         await newStadium.save()
//         res.status(200).send()
//     } catch (err) {
//         res.status(500).send()
//     }
// })


module.exports = router