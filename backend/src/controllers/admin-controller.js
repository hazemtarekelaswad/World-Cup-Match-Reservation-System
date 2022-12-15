const userHelper = require('../helpers/user-helper')

const { User } = require('../models/user-model')

const getpandeng = async (req, res) => {

    const users =await User.find({"status": "pending"})
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", users)
    res.status(200).send({users});
}
const approve = async (req, res) => {

    const users =await User.updateOne({"_id": req.params.id},{"status": "approved"})
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", users)
    res.status(200).send({users});
}
const deleteuser = async (req, res) => {

    const users =await User.deleteOne({"_id": req.params.id},{"status": "approved"})
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", users)
    res.status(200).send({users});
}

module.exports = { 
    getpandeng,
    approve,deleteuser
}