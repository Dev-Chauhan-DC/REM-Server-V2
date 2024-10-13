const middlewares = require("../middleware/middleware.js");
const propertyControllers = require("../controllers/propertyControllers");
const propertyValidator = require("../validators/propertyValidator")
const validate = require("../middleware/validate")
const { prepath } = require('../utilities');



const propertyRoutes = (app) => {


    app.delete(`${prepath}/property/:property_id`, propertyControllers.deleteProperty);

    app.get(`${prepath}/properties/:swlat/:swlong/:nelat/:nelong`,
        propertyValidator.getPropertiesSearchResult, validate,
        propertyControllers.getPropertiesSearchResult);

    app.post(`${prepath}/property`, propertyControllers.getProperty);
    app.get(`${prepath}/properties`, propertyValidator.getProperties, propertyControllers.getProperties);



    // Protected
    app.get(`${prepath}/user/properties`,
        middlewares.isAuthenticate,
        propertyControllers.getUserProperties);



    app.post(`${prepath}/list/property`,
        middlewares.isAuthenticate,
        propertyValidator.createProperty, validate,
        propertyControllers.createProperty);

}

module.exports = propertyRoutes
