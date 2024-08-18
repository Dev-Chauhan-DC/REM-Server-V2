const middlewares = require("../middleware/middleware.js");
const propertyControllers = require("../controllers/propertyControllers");
const propertyValidator = require("../validators/propertyValidator")
const validate = require("../middleware/validate")
const { prepath } = require('../utilities');



const propertyRoutes = (app) => {

    app.post(`${prepath}/list/property`, middlewares.isAuthenticate, middlewares.checkSubscription, propertyValidator.createProperty, validate, propertyControllers.createProperty);
    app.get(`${prepath}/user/properties`, middlewares.isAuthenticate, middlewares.checkSubscription, propertyControllers.getUserProperties);
    app.delete(`${prepath}/property/:property_id`, middlewares.isAuthenticate, middlewares.checkSubscription, propertyControllers.deleteProperty);
    app.get(`${prepath}/properties/:swlat/:swlong/:nelat/:nelong`, middlewares.isAuthenticate, middlewares.checkSubscription, propertyControllers.getPropertiesSearchResult);
    app.post(`${prepath}/property`, middlewares.isAuthenticate, middlewares.checkSubscription, propertyControllers.getProperty);
    app.get(`${prepath}/properties`, middlewares.isAuthenticate, middlewares.checkSubscription, propertyValidator.getProperties, propertyControllers.getProperties);

}

module.exports = propertyRoutes
