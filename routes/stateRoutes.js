const { prepath } = require("../utilities/index.js");
const stateControllers = require('../controllers/stateControllers.js')



const StateRoutes = (app) => {
    app.get(`${prepath}/state/names`, stateControllers.getNames);
    app.get(`${prepath}/state/names/count`, stateControllers.countNames);
}


module.exports = StateRoutes
