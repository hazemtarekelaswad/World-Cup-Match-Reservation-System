const userHelper = require('../helpers/user-helper')

const { Match } = require('../models/match-model')
const { Stadium } = require('../models/stadium-model')



const createMatch = async (req, res) => {

    
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

    const match =await Match.updateOne({"_id": req.params.id},{...req.body})
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", match)
    res.status(200).send({match});
}
const getMatch = async (req, res) => {

    const match =await Match.findById(req.params.id)
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", match)
    res.status(200).send({match});
}
const deleteMatch = async (req, res) => {

    const match =await Match.deleteOne({"_id":req.params.id})
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", match)
    res.status(200).send({match});
}
const getallMatch = async (req, res) => {

    const matchs =await Match.find()
    console.log("🚀 ~ file: admin-controller.js:8 ~ getpandeng ~ users", matchs)
    res.status(200).send({matchs});
}


module.exports = { 
    createMatch,
    updateMatch,
    getMatch,
    getallMatch,
    deleteMatch
}