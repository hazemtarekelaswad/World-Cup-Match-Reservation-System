const userHelper = require('../helpers/user-helper')
const stadiumHelper = require('../helpers/stadium-helper')

const { Match } = require('../models/match-model')
const { Stadium } = require('../models/stadium-model')
const { Team } = require('../models/team-model')



const createMatch = async (req, res) => {

    // validate the role of manager
    if (req.authUser.role != "manager") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a manager"
    })

    const matchs = await Match.find({$or:[{"firstTeam":req.body.firstTeam},{"secondTeam":req.body.firstTeam},{"firstTeam":req.body.secondTeam},{"secondTeam":req.body.secondTeam}]})
    console.log("🚀 ~ file: match-controller.js:11 ~ createMatch ~ matchs", matchs)
    const d = new Date( req.body.date);
    console.log("🚀 ~ file: match-controller.js:14 ~ createMatch ~ d", d)
    let day = d.getDay();
    console.log("🚀 ~ file: match-controller.js:16 ~ createMatch ~ day", day)


    for (const match of matchs) {
        if(new Date(match.date).getDay() == day){
            return res.status(400).send({
                "status": "failure",
                "message": "one of teams already has a match"
            });
        }
    }

    if (!("stadium" in req.body)) return res.status(400).send({
        "status": "failure",
        "message": "stadium must be included in the request body"
    })

    // Validate empty stadium
    const matchesOnSameStadium = await Match.find({ "stadium": req.body.stadium })
    for (let match of matchesOnSameStadium) {
        if (new Date(req.body.date).getTime() >= new Date(match.date.getTime() - 3 * 60 * 60 * 1000)
            && new Date(req.body.date).getTime() <= new Date(match.date.getTime() + 3 * 60 * 60 * 1000))
            return res.status(400).send({
                "status": "failure",
                "message": "Match date is clashing with other match played at the same stadium"
            })
    }

    const match = await Match.create(req.body)
    res.status(200).send({match});
}

const updateMatch = async (req, res) => {
    // validate the role of manager
    if (req.authUser.role != "manager") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a manager"
    })

    const match = await Match.updateOne({ "_id": req.params.id }, { ...req.body })
    if (!match) return res.status(400).send({
        "status": "failure",
        "message": "match does not exist in the system"
    })

    res.status(201).send({
        "status": "success",
        "message": "match has been updated successfully"
    })
}

const getMatch = async (req, res) => {
    const match = await Match.findById(req.params.id)
    const stadium = await Stadium.findById(match.stadium)

    const matchToSend = {
        matchId: match._id,
        firstTeam: match.firstTeam,
        secondTeam: match.secondTeam,
        stadium: {
            name: stadium.name,
            columnsCount: stadium.columnsCount,
            rowsCount: stadium.rowsCount
        },
        date: match.date,
        referee: match.referee,
        firstLineman: match.firstLineman,
        secondLineman: match.secondLineman,
        fans: match.fans,
    }

    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", match)
    res.status(200).send(matchToSend)
}

const deleteMatch = async (req, res) => {
    // validate the role of manager
    if (req.authUser.role != "manager") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a manager"
    })

    const match =await Match.deleteOne({"_id":req.params.id})
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", match)
    res.status(200).send({match});
}
const getAllMatches = async (req, res) => {

    const matches = await Match.find()
    let matchesToSend = []
    for (let match of matches) {
        const stadium = await Stadium.findById(match.stadium)
        const matchToSend = {
            matchId: match._id,
            firstTeam: match.firstTeam,
            secondTeam: match.secondTeam,
            stadium: {
                name: stadium.name,
                columnsCount: stadium.columnsCount,
                rowsCount: stadium.rowsCount
            },
            date: match.date,
            referee: match.referee,
            firstLineman: match.firstLineman,
            secondLineman: match.secondLineman,
            fans: match.fans,
        }
        matchesToSend.push(matchToSend)
    }
    
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", matches)
    res.status(200).send(matchesToSend)
}

const addStadium = async (req, res) => {
    // validate the role of manager
    if (req.authUser.role != "manager") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a manager"
    })

    // Validate all user data
    const { error } = stadiumHelper.validateAddingStadium(req.body)
    if (error) return res.status(400).send({
        "status": "failure",
        "message": error.details[0].message
    })

    const stadium = await Stadium.findOne({ "name": req.body.name })
    if (stadium) return res.status(400).send({
        "status": "failure",
        "message": "Stadium has already been created, choose another name"
    })



    const newStadium = new Stadium(req.body)
    try {
        await newStadium.save()
        res.status(200).send({
           "status": "success",
           "message": "Stadium created successfully"
       })
    } catch (err) {
        res.status(500).send({
           "status": "failure",
           "message": "Internal server error"
       })
    }
 }

const getStadiums = async (req, res) => {
    // validate the role of manager
    if (req.authUser.role != "manager") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a manager"
    })

    const stadiums = await Stadium.find()
    let stadiumsToSend = []
    for (let stadium of stadiums) {
        const stadiumToSend = {
            stadiumId: stadium._id,
            name: stadium.name,
            columnsCount: stadium.columnsCount,
            rowsCount: stadium.rowsCount
        }
        stadiumsToSend.push(stadiumToSend)
    }
    
    res.status(200).send({"stadiums" : stadiumsToSend})
 }
 
const getStadium = async (req, res) => {
    // validate the role of manager
    if (req.authUser.role != "manager") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a manager"
    })

    const stadium = await Stadium.findById(req.params.id)
    if (!stadium) return res.status(404).send({
        "status": "failure",
        "message": "Stadium does not exist in the system"
    })
    
    res.status(200).send({
        stadiumId: stadium._id,
        name: stadium.name,
        columnsCount: stadium.columnsCount,
        rowsCount: stadium.rowsCount
    })
}

const updateStadium = async (req, res) => {
    // validate the role of manager
    if (req.authUser.role != "manager") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a manager"
    })

    const stadium = await Stadium.findOneAndUpdate({ "_id": req.params.id },{ ...req.body })
    if (!stadium) return res.status(400).send({
        "status": "failure",
        "message": "Stadium does not exist in the system"
    })

    res.status(201).send({
        "status": "success",
        "message": "Stadium has been updated successfully"
    })
}


module.exports = { 
    createMatch,
    updateMatch,
    getMatch,
    getAllMatches,
    deleteMatch,
    addStadium,
    getStadiums,
    getStadium,
    updateStadium
}