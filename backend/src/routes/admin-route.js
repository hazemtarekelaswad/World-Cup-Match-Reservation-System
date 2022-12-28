const express = require('express')
const router = express.Router()
const admincontroller = require('../controllers/admin-controller')
const auth = require('../middlewares/auth')



router.get('/admin/getpandeng', auth.verifyToken, admincontroller.getpandeng)
router.post('/admin/approve/:id', auth.verifyToken, admincontroller.approve)
router.delete('/admin/user/:id', auth.verifyToken, admincontroller.deleteuser)
router.get('/admin/users', auth.verifyToken, admincontroller.getAllUsers)





module.exports = router