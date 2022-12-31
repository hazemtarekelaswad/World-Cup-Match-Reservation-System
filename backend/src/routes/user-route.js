const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const auth = require('../middlewares/auth')


router.post('/users/signup', userController.signup)
router.post('/users/signin', userController.signin)
router.get('/users/me', auth.verifyToken, userController.getUser)
router.put('/users/me', auth.verifyToken, userController.updateUser)
router.put('/users/me/password', auth.verifyToken, userController.updatePassword)
router.put('/users/reservation', auth.verifyToken, userController.reserveSeat) 
router.get('/users/reservations', auth.verifyToken, userController.getReservations)
router.put('/users/cancellation', auth.verifyToken, userController.cancelSeat)

router.get('/teams', userController.getTeams)




module.exports = router