const middlewares = require("../middleware/middleware.js");
const savePropertyControllers = require("../controllers/savedPropertyControllers");
const { prepath } = require('../utilities');


const savedPropertyRoutes = (app) => {

    // Public


    // Protected
    app.post(`${prepath}/save/property`,
        middlewares.isAuthenticate,
        savePropertyControllers.createSaveProperty);

    app.get(`${prepath}/properties/saved`,
        middlewares.isAuthenticate,
        savePropertyControllers.getSavedProperties);


    app.get(`${prepath}/saved-property`,
        middlewares.isAuthenticate,
        savePropertyControllers.getSavedPropertiesV2);
}

module.exports = savedPropertyRoutes
