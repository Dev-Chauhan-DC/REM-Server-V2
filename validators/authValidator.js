const {isPhoneNumber} = require("../utilities/validator");
const {notFound404, badRequest400} = require("../utilities/responseUtility");
const {body} = require("express-validator");


const sendOtp = async (req, res, next) => {
    const phone = req.body.phone;

    const validatePhone = isPhoneNumber(phone);

    if (!validatePhone) {
        return res.status(400).send(badRequest400("Invalid Phone Number"))
    }

    next()
}

const sendOtpValidator = [
    body("phone")
        .isMobilePhone('en-IN').withMessage('Invalid Phone Number')
]

module.exports = {sendOtp, sendOtpValidator}
