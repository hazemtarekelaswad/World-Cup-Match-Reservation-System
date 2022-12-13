const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')


router.post('/users/signup', userController.signup)
router.post('/users/signin', userController.signin)



module.exports = router