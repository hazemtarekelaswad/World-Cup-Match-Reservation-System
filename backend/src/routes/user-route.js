const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const auth = require('../middlewares/auth')


router.post('/users/signup', userController.signup)
router.post('/users/signin', userController.signin)
router.get('/users/me', auth.verifyToken, userController.getUser)
router.put('/users/me', auth.verifyToken, userController.updateUser)
// TODO: create endpoint for updating password, or just put this functionality in updateUser endpoint

// router.put('/users/reservation', auth.verifyToken, userController.reserveSeat) 
/*{
    matchId
    seatColumn
    seatRow
    creditCard
    pinNumber
}*/
// router.put('/users/cancellation', auth.verifyToken, userController.cancelSeat)




module.exports = router