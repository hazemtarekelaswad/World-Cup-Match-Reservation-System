const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const auth = require('../middlewares/auth')


router.post('/users/signup', userController.signup)
router.post('/users/signin', userController.signin)
router.get('/users/me', auth.verifyToken, userController.getUser)
router.put('/users/me', auth.verifyToken, userController.updateUser)



module.exports = router