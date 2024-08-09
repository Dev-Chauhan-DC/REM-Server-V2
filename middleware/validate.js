const { validationResult } = require('express-validator');
const {badRequest400} = require("../utilities/responseUtility");




const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).send(badRequest400("", errors.array()));
    }
    next();
}

module.exports = validate
