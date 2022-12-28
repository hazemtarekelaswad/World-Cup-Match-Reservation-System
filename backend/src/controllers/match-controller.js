const userHelper = require('../helpers/user-helper')

const { Match } = require('../models/match-model')
const { Stadium } = require('../models/stadium-model')



const createMatch = async (req, res) => {

    // validate the role of manager
    if (req.authUser.role != "manager") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a manager"
    })

    const matchs =await Match.find({$or:[{"firstTeam":req.body.firstTeam},{"secondTeam":req.body.firstTeam},{"firstTeam":req.body.secondTeam},{"secondTeam":req.body.secondTeam}]})
    console.log("🚀 ~ file: match-controller.js:11 ~ createMatch ~ matchs", matchs)
    const d =new Date( req.body.date);
    console.log("🚀 ~ file: match-controller.js:14 ~ createMatch ~ d", d)
    let day = d.getDay();
    console.log("🚀 ~ file: match-controller.js:16 ~ createMatch ~ day", day)


for (const match of matchs) {
    if(new Date( match.date).getDay()==day){


        return  res.status(400).send({
            "status": "failure",
            "message": "one of teams already has a match"
        });
    }
}
  
    console.log("🚀 ~ file: match-controller.js:14 ~ createMatch ~ day", day)
    const match =await Match.create(req.body)
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", match)
    res.status(200).send({match});
}

const updateMatch = async (req, res) => {
    // validate the role of manager
    if (req.authUser.role != "manager") return res.status(403).send({
        "status": "failure",
        "message": "Forbidden access. Must be a manager"
    })

    const match =await Match.updateOne({"_id": req.params.id},{...req.body})
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", match)
    res.status(200).send({match});
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

     const newStadium = new Stadium(req.body)
     console.log("🚀 ~ file: stadium-route.js:10 ~ router.post ~ newStadium", newStadium)
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


module.exports = { 
    createMatch,
    updateMatch,
    getMatch,
    getAllMatches,
    deleteMatch,
    addStadium
}