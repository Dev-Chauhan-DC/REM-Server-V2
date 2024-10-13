const middlewares = require("../middleware/middleware.js");
const interestedPeoplesControllers = require("../controllers/interestedPeoplesControllers");
const { prepath } = require('../utilities');

const interestedPeoplesRoutes = (app) => {





    // Protected Routes
    app.get(`${prepath}/property/:property_id/interested/peoples`,
        middlewares.isAuthenticate,
        interestedPeoplesControllers.getPropertyInterestedPeople);

    app.post(`${prepath}/list/interested/person`,
        middlewares.isAuthenticate,
        interestedPeoplesControllers.createInterestedPerson);

}

module.exports = interestedPeoplesRoutes
