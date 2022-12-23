const userHelper = require('../helpers/user-helper')

const { User } = require('../models/user-model')
const { use } = require('../routes/match-route')

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

const getAllUsers = async (req, res) => {
    const users = await User.find()
    usersToSend = users.map((user) => {
        return {
            userId: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            gender: user.gender,
            nationality: user.nationality,
            email: user.email,
            role: user.role,
            status: user.status,
            matches: user.matches
        }
    })
    res.status(200).send(usersToSend)
}

module.exports = { 
    getpandeng,
    approve,
    deleteuser,
    getAllUsers
}