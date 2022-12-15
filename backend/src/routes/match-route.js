const express = require('express')
const router = express.Router()
const { Match } = require('../models/match-model')
const mangercontroller = require('../controllers/match-controller')


router.get('/matches', mangercontroller.getAllMatches)
router.get('/matches/:id', mangercontroller.getMatch)

router.patch('/manager/match/:id', mangercontroller.updateMatch)
router.post('/manager/match', mangercontroller.createMatch)
router.delete('/manager/match/:id', mangercontroller.deleteMatch)

module.exports = router