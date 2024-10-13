const { body, param } = require("express-validator");

const updateRoleValidator = [
    body('roleId')
        .notEmpty().withMessage("Please Select Role")
        .isIn([1, 2, 3]).withMessage('Invalid Role')
]


const updateProfileInfoValidator = [
    body('email')
        .optional({ checkFalsy: true })
        .isEmail().withMessage("Invalid Email"),
    body('firstName')
        .optional({ checkFalsy: true })
        .isLength({ min: 2, max: 20 }).withMessage("Minimum 2 and Maximum 20 Characters Require in First Name"),
    body('lastName')
        .optional({ checkFalsy: true })
        .isLength({ min: 2, max: 20 }).withMessage("Minimum 2 and Maximum 20 Characters Require in Last Name"),
    body('secondaryNumber')
        .optional({ checkFalsy: true })
        .isMobilePhone('en-IN').withMessage('Invalid Phone Number'),
    body('agencyName')
        .optional({ checkFalsy: true })
        .isLength({ min: 2, max: 20 }).withMessage("Minimum 2 and Maximum 20 Characters Require in Agency Name"),
    body('companyName')
        .optional({ checkFalsy: true })
        .isLength({ min: 2, max: 20 }).withMessage("Minimum 2 and Maximum 20 Characters Require in Agency Name"),
]
const getUserV2Validator = [
    param('id')
        .notEmpty().withMessage('ID is required')
        .isInt().withMessage('ID must be an integer')
]

module.exports = { updateRoleValidator, updateProfileInfoValidator, getUserV2Validator }
