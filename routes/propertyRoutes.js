const middlewares = require("../middleware/middleware.js");
const propertyControllers = require("../controllers/propertyControllers");
const propertyValidator = require("../validators/propertyValidator")
const validate = require("../middleware/validate")
const { prepath } = require('../utilities');



const propertyRoutes = (app) => {

    app.post(`${prepath}/list/property`, middlewares.isAuthenticate, propertyValidator.createProperty, validate, propertyControllers.createProperty);
    app.get(`${prepath}/user/properties`, middlewares.isAuthenticate, propertyControllers.getUserProperties);
    app.delete(`${prepath}/property/:property_id`, middlewares.isAuthenticate, propertyControllers.deleteProperty);
    app.get(`${prepath}/properties/:swlat/:swlong/:nelat/:nelong`, middlewares.isAuthenticate, propertyControllers.getPropertiesSearchResult);
    app.post(`${prepath}/property`, middlewares.isAuthenticate, propertyControllers.getProperty);
    app.get(`${prepath}/properties`, middlewares.isAuthenticate, propertyValidator.getProperties, propertyControllers.getProperties);

}

module.exports = propertyRoutes
