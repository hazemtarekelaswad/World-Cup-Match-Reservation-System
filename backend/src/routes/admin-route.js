const express = require('express')
const router = express.Router()
const admincontroller = require('../controllers/admin-controller')



router.get('/admin/getpandeng', admincontroller.getpandeng)
router.post('/admin/approve/:id', admincontroller.approve)
router.delete('/admin/user/:id', admincontroller.deleteuser)
router.get('/admin/users', admincontroller.getAllUsers)





module.exports = router