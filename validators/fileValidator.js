const response = require('../utilities/responseUtility')
const {isNumber, isString, checkStringLength} = require("../utilities/validator");

const createFile = (req, res, next) => {
    const data = {
        name: req.body.name,
        type: req.body.type,
        storage_key: req.body.storage_key,
        size: req.body.size
    }

    if (!(isString(data.name) && checkStringLength(data.name, 3, 1000))) {
        return res.status(400).send(response.badRequest400("Invalid name", data.name))
    }
    if (!(isString(data.type) && checkStringLength(data.type, 3, 1000))) {
        return res.status(400).send(response.badRequest400("Invalid type", data.type))
    }
    if (!(isString(data.storage_key) && checkStringLength(data.storage_key, 3, 1000))) {
        return res.status(400).send(response.badRequest400("Invalid storage_key", data.storage_key))
    }
    if(!isNumber(data.size)){
        return res.status(400).send(response.badRequest400("Invalid size", data.size))
    }

    next()

}


module.exports = {createFile}
