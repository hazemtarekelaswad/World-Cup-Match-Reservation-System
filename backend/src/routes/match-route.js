const express = require('express')
const router = express.Router()
const { Match } = require('../models/match-model')
const mangercontroller = require('../controllers/match-controller')


router.get('/manager/matchs/:id', mangercontroller.getMatch)
router.patch('/manager/match/:id', mangercontroller.updateMatch)

router.get('/manager/matchs', mangercontroller.getallMatch)

router.post('/manager/match', mangercontroller.createMatch)
router.delete('/manager/match/:id', mangercontroller.deleteMatch)

module.exports = router