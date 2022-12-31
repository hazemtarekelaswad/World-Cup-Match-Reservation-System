const Joi = require('joi')


const validateAddingStadium = (stadiumData) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(1).max(100).required(),
        columnsCount: Joi.number().integer().min(3).max(500).required(),
        rowsCount: Joi.number().integer().min(3).max(500).required()
    })
    return schema.validate(stadiumData)
}

module.exports = {
    validateAddingStadium
}