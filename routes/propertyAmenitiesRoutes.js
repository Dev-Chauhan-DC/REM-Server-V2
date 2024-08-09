const middlewares = require("../middleware/middleware.js");
const propertyAmenitiesControllers = require("../controllers/propertyAmenitiesControllers");
const { createPropertyAmenitiesValidator } = require("../validators/propertyAmenitiesValidator");
const validate = require("../middleware/validate")
const { prepath } = require('../utilities');




const propertyAmenitiesRoutes = (app) => {
    app.post(`${prepath}/list/property/amenities`, middlewares.isAuthenticate, createPropertyAmenitiesValidator, validate, propertyAmenitiesControllers.createPropertyAmenities);
}

module.exports = propertyAmenitiesRoutes

