const express = require('express')
const router = express.Router()
const { Match } = require('../models/match-model')
const auth = require('../middlewares/auth')
const mangercontroller = require('../controllers/match-controller')


router.get('/matches', mangercontroller.getAllMatches)
router.get('/matches/:id', mangercontroller.getMatch)

router.patch('/manager/match/:id', auth.verifyToken, mangercontroller.updateMatch)
router.post('/manager/match', auth.verifyToken, mangercontroller.createMatch)
router.delete('/manager/match/:id', auth.verifyToken, mangercontroller.deleteMatch)

router.get('/teams', auth.verifyToken, mangercontroller.getTeams)

module.exports = router