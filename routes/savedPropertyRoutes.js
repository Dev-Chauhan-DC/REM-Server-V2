const middlewares = require("../middleware/middleware.js");
const savePropertyControllers = require("../controllers/savedPropertyControllers");
const { prepath } = require('../utilities');


const savedPropertyRoutes = (app) => {
    app.post(`${prepath}/save/property`, middlewares.isAuthenticate, middlewares.checkSubscription, savePropertyControllers.createSaveProperty);
    app.get(`${prepath}/properties/saved`, middlewares.isAuthenticate, middlewares.checkSubscription, savePropertyControllers.getSavedProperties);
}

module.exports = savedPropertyRoutes
