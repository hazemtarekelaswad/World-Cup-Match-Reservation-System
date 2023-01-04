const express = require('express')
const router = express.Router()
const { Match } = require('../models/match-model')
const auth = require('../middlewares/auth')
const mangercontroller = require('../controllers/match-controller')

router.get("/matches", mangercontroller.getAllMatches);
router.get("/matches/:id", mangercontroller.getMatch);

router.patch("/manager/match/:id", mangercontroller.updateMatch);
// update match example
// {
//     "firstTeam": "5f9f1b1b1b1b1b1b1b1b1b1b",
//     "secondTeam": "5f9f1b1b1b1b1b1b1b1b1b1b",
//     "stadium": "5f9f1b1b1b1b1b1b1b1b1b1b",
//     "date": "2020-11-11T00:00:00.000Z",
//     "referee": "5f9f1b1b1b1b1b1b1b1b1b1b",
//     "firstLineman": "5f9f1b1b1b1b1b1b1b1b1b1b",
//     "secondLineman": "5f9f1b1b1b1b1b1b1b1b1b1b",
//     "fans": [
//         "5f9f1b1b1b1b1b1b1b1b1b1b",
//         "5f9f1b1b1b1b1b1b1b1b1b1b"
//     ]
// }

router.put('/matches/:id', auth.verifyToken, mangercontroller.updateMatch)
router.post('/manager/match', auth.verifyToken, mangercontroller.createMatch)
router.delete('/manager/match/:id', auth.verifyToken, mangercontroller.deleteMatch)


module.exports = router;
