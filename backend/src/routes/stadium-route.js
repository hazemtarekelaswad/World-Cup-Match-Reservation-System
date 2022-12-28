const express = require('express')
const router = express.Router()
const { Stadium } = require('../models/stadium-model')
const managerController = require('../controllers/match-controller')
const auth = require('../middlewares/auth')



// TODO: Handle HTTP requests

 router.post('/stadium', auth.verifyToken, managerController.addStadium)


module.exports = router