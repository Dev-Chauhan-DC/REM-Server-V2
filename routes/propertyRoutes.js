const middlewares = require("../middleware/middleware.js");
const propertyControllers = require("../controllers/propertyControllers");
const propertyValidator = require("../validators/propertyValidator")
const validate = require("../middleware/validate")
const { prepath } = require('../utilities');



const propertyRoutes = (app) => {




    app.get(`${prepath}/properties/:swlat/:swlong/:nelat/:nelong`,
        propertyValidator.getPropertiesSearchResult, validate,
        propertyControllers.getPropertiesSearchResult);

    app.get(`${prepath}/properties-v2/:swlat/:swlong/:nelat/:nelong`,
        middlewares.isAuthenticateWithNext,
        propertyValidator.getPropertiesSearchResult,
        validate,
        propertyControllers.getPropertiesSearchResultV2);

    app.get(`${prepath}/listings`, propertyControllers.listings)

    app.post(`${prepath}/property`, propertyControllers.getProperty);

    app.get(`${prepath}/property/:id`,
        middlewares.isAuthenticateWithNext,
        propertyControllers.getPropertyV2);

    app.get(`${prepath}/properties`, propertyValidator.getProperties, propertyControllers.getProperties);



    // Protected
    app.get(`${prepath}/user/properties`,
        middlewares.isAuthenticate,
        propertyControllers.getUserProperties);

    app.get(`${prepath}/properties/user`,
        middlewares.isAuthenticate,
        propertyControllers.getUserPropertiesV2);



    app.post(`${prepath}/list/property`,
        middlewares.isAuthenticate,
        propertyValidator.createProperty, validate,
        propertyControllers.createProperty);

    app.delete(`${prepath}/property/:property_id`,
        middlewares.isAuthenticate,
        propertyControllers.deleteProperty);


    app.put(`${prepath}/property/:id`,
        middlewares.isAuthenticate,
        propertyControllers.update)

}

module.exports = propertyRoutes
