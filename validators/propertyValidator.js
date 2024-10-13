const { badRequest400 } = require("../utilities/responseUtility");
const { body, param, query } = require('express-validator');


const getProperties = (req, res, next) => {
    const { ids } = req.query
    const idArray = ids.split(',');
    const numericArray = idArray.map(Number);

    if (numericArray.length > 3) {
        return res.status(400).send(badRequest400("Maximum limit 3 properties"))
    }

    next();
}

const createProperty = [
    body('purposeId')
        .notEmpty().withMessage('Purpose ID is Required')
        .isInt().withMessage('Invalid Purpose ID')
        .isIn([1, 2]).withMessage('Purpose ID must be 1 or 2'),
    body('homeTypeId')
        .notEmpty().withMessage('House Type is Required')
        .isInt().withMessage('Invalid House Type')
        .isIn([1, 2, 3, 4]).withMessage('House Type must be 1, 2, 3, or 4'),
    body('address').isLength({ min: 11 })
        .withMessage('Address must be longer than 10 characters'),
    body('bedroomCount')
        .notEmpty().withMessage('Please Select Bedroom')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Bedroom must be 0, 1, 2, 3, 4 or 5'),
    body('bathroomCount')
        .notEmpty().withMessage('Please Select Bedroom')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Bedroom must be 0, 1, 2, 3, 4 or 5'),
    body('hallCount')
        .notEmpty().withMessage('Please Select Bedroom')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Bedroom must be 0, 1, 2, 3, 4 or 5'),
    body('kitchenCount')
        .notEmpty().withMessage('Please Select Bedroom')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Bedroom must be 0, 1, 2, 3, 4 or 5'),
    body('balconyCount')
        .notEmpty().withMessage('Please Select Bedroom')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Bedroom must be 0, 1, 2, 3, 4 or 5'),
    body('builtUpArea')
        .notEmpty().withMessage('Please Enter Built Up Area')
        .isFloat({ gt: 0 }).withMessage('Built Up Area must be a positive number')
        .isFloat({ lt: 5000001 }).withMessage('Built Up Area must be a less then 5000001'),
    body('carpetArea')
        .notEmpty().withMessage('Please Enter Carpet Area')
        .isFloat({ gt: 0 }).withMessage('Carpet Area must be a positive number')
        .isFloat({ lt: 5000001 }).withMessage('Carpet Area must be a less then 5000001')
        .custom((value, { req }) => {
            if (parseFloat(value) > parseFloat(req.body.builtUpArea)) {
                throw new Error('Carpet Area must be equal to or greater than Built Up Area');
            }
            return true;
        }),
    body('plotArea')
        .custom((value, { req }) => {
            if (parseInt(req.body.homeTypeId) == 1 || parseInt(req.body.homeTypeId) == 3) {
                return true;
            }

            if (value.toString().trim().length === 0) {
                throw new Error('Please Enter Plot Area')
            }

            if (isNaN(parseFloat(value))) {
                throw new Error('Invalid Plot Area')
            }

            if (parseFloat(value) <= 0) {
                throw new Error('Plot Area must be a positive number')
            }

            if (parseFloat(value) > 5000000) {
                throw new Error('Plot Area must be must be a less then 5000001')
            }

            if (parseFloat(value) < parseFloat(req.body.builtUpArea)) {
                throw new Error('Plot Area must be equal to or greater than Built Up Area')
            }

            return true;
        }),
    body('facingId')
        .notEmpty().withMessage('Please Select Facing')
        .isIn([1, 2, 3, 4, 5, 6, 7, 8]).withMessage('Invalid Facing'),
    body('propertyAge')
        .notEmpty().withMessage("Please Enter Property Age")
        .isFloat({ gt: -1, lt: 101 }).withMessage("Property age must in between 1 to 100"),
    body('totalFloor')
        .notEmpty().withMessage('Please enter total floor')
        .isInt({ gt: -1, lt: 201 }).withMessage("Total floor must in between 1 to 200"),
    body('propertyFloor')
        .custom((value, { req }) => {
            if (parseInt(req.body.homeTypeId) == 2 || parseInt(req.body.homeTypeId) == 4) {
                return true;
            }

            if (value.toString().trim().length === 0) {
                throw new Error('Please Enter Property Floor')
            }

            if (isNaN(parseInt(value))) {
                throw new Error('Invalid Property Floor')
            }

            if (parseInt(value) < 0 || parseInt(value) > 200) {
                throw new Error('Property floor must in between 1 to 200')
            }

            if (value > parseInt(req.body.totalFloor)) {
                throw new Error('Property Floor must be equal or less then Total Floor')
            }

            return true;
        }),
    body('flooringTypeId')
        .notEmpty().withMessage("Please Select Flooring Type")
        .isIn([1, 2, 3, 4, 5]).withMessage('Invalid Flooring Type'),
    body('ownershipTypeId')
        .custom((value, { req }) => {
            if (parseInt(req.body.purposeId) == 2) {
                return true;
            }

            if (value.toString().trim().length == 0) {
                throw new Error('Please Enter Ownership Type')
            }

            if (isNaN(parseInt(value))) {
                throw new Error('Invalid Ownership Type')
            }

            if (![1, 2].includes(parseInt(value))) {
                throw new Error('Ownership Type Must Be 1 or 2')
            }

            return true;
        }),
    body('latitude')
        .notEmpty().withMessage('Please Select Latitude')
        .isFloat().withMessage('Latitude must be float'),
    body('longitude')
        .notEmpty().withMessage('Please Select Latitude')
        .isFloat().withMessage('Longitude must be float'),
    body('price')
        .notEmpty().withMessage('Please Enter Price')
        .isInt({ gt: 0, lt: 10000000001 }).withMessage('Price must be greater then 0 and less then 10000000001'),
    body('maintenance')
        .notEmpty().withMessage('Please Enter Maintenance')
        .isInt({ gt: -1, lt: 10000000001 }).withMessage('Maintenance must be greater then -1 and less then 10000000001'),
    body('availabilityTypeId')
        .notEmpty().withMessage('Please Select Availability Type')
        .isIn([1, 2, 3, 4]).withMessage('Availability Type must be 1,2,3 or 4'),
    body('furnishingsId')
        .notEmpty().withMessage('Please Select Furnishing')
        .isIn([1, 2, 3]).withMessage('Furnishing must be 1,2,3 or 4'),
    body('parkingSlotTwoWheelerCount')
        .notEmpty().withMessage('Please select Parking slot Two Wheeler')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Parking slot Two Wheeler must be 0,1,2,3,4 or 5'),
    body('parkingSlotFourWheelerCount')
        .notEmpty().withMessage('Please select Parking slot Two Wheeler')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Parking slot Four Wheeler must be 0,1,2,3,4 or 5'),
    body('cupboard')
        .notEmpty().withMessage('Please select Cupboard')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Cupboard must be 0,1,2,3,4 or 5'),
    body('kitchenTypesId')
        .notEmpty().withMessage('Please select kitchen Types')
        .isIn([1, 2, 3]).withMessage('kitchen Types must be 0,1,2,3,4 or 5'),
    body('propertyDescription')
        .notEmpty().withMessage('Please Enter Property Description')
        .isLength({ min: 10 }).withMessage("Minimum length is 10"),
    body('possessionsId')
        .notEmpty().withMessage('Please Select Possession Status')
        .isIn([1, 2]).withMessage('Possession Status Must be 1 or 2'),
    body('flatsInBuilding')
        .custom((value, { req }) => {
            if (parseInt(req.body.homeTypeId) == 2 || parseInt(req.body.homeTypeId) == 4) {
                return true;
            }

            if (value.toString().trim().length == 0) {
                throw new Error('Please Enter Flats in Building')
            }

            if (isNaN(parseInt(value))) {
                throw new Error('Invalid Flats in Building')
            }

            if (parseInt(value) < 1 || parseInt(value) > 900) {
                throw new Error('Flats in Building Must be in between 1 and 900')
            }

            return true;
        }),
    body('deposit')
        .notEmpty().withMessage('Please Enter deposit')
        .isInt({ gt: 0, lt: 10000000001 }).withMessage('Deposit must be greater then 0 and less then 10000000001'),
    body('tenantsId')
        .custom((value, { req }) => {
            if (parseInt(req.body.purposeId) == 1) {
                return true;
            }

            if (value.toString().trim().length == 0) {
                throw new Error('Please Select Tenant')
            }

            if (isNaN(parseInt(value))) {
                throw new Error('Invalid Tenant')
            }

            if (![1, 2, 3, 4, 5].includes(parseInt(value))) {
                throw new Error('Tenant must be 1,2,3,4 or 5')
            }

            return true;
        })
    ,
];
const getPropertiesSearchResult = [
    query('limit')
        .optional()
        .isInt().withMessage('Limit must be an integer')
];

module.exports = { getProperties, createProperty, getPropertiesSearchResult }
