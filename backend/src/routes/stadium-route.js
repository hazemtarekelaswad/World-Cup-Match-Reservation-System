const express = require('express')
const router = express.Router()
const { Stadium } = require('../models/stadium-model')
const managerController = require('../controllers/match-controller')
const auth = require('../middlewares/auth')


 router.post('/stadium', auth.verifyToken, managerController.addStadium)
 router.get('/stadiums', auth.verifyToken, managerController.getStadiums)
 router.get('/stadiums/:id', auth.verifyToken, managerController.getStadium)
 router.put('/stadiums/:id', auth.verifyToken, managerController.updateStadium)


module.exports = router