const userHelper = require('../helpers/user-helper')

const { User } = require('../models/user-model')
const { use } = require('../routes/match-route')

const getpandeng = async (req, res) => {
    // validate the role of admin
    if (req.authUser.role != "admin") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be an admin"
    })

    const users =await User.find({"status": "pending"})
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", users)
    res.status(200).send({users});
}
const approve = async (req, res) => {
    // validate the role of admin
    if (req.authUser.role != "admin") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be an admin"
    })

    try {
        const users =await User.updateOne({"_id": req.params.id},{"status": "approved"})
        console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", users)
        res.status(200).send({
            "status": "success",
            "message": "approved successfully"
        });
    } catch (err) {
        res.status(500).send({
            "status": "failure",
            "message": "Internal server error"
        })
    }
}
const deleteuser = async (req, res) => {
    // validate the role of admin
    if (req.authUser.role != "admin") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be an admin"
    })

    try {
        const users =await User.deleteOne({"_id": req.params.id},{"status": "approved"})
        if (users.deletedCount === 0) return res.status(404).send({
                "status": "failure",
                "message": "User has already been deleted"
        });
          
        console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", users)
        res.status(200).send({
            "status": "success",
            "message": "Deleted successfully"
        });
    } catch {
        res.status(500).send({
            "status": "failure",
            "message": "Internal server error"
        });
    }
}

const getAllUsers = async (req, res) => {
    // validate the role of admin
    if (req.authUser.role != "admin") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be an admin"
    })

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