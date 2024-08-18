const middlewares = require("../middleware/middleware.js");
const interestedPeoplesControllers = require("../controllers/interestedPeoplesControllers");
const { prepath } = require('../utilities');

const interestedPeoplesRoutes = (app) => {
    app.get(`${prepath}/property/:property_id/interested/peoples`,
        middlewares.isAuthenticate,
        middlewares.checkSubscription,
        interestedPeoplesControllers.getPropertyInterestedPeople);
    app.post(`${prepath}/list/interested/person`,
        middlewares.isAuthenticate,
        middlewares.checkSubscription,
        interestedPeoplesControllers.createInterestedPerson);

}

module.exports = interestedPeoplesRoutes
