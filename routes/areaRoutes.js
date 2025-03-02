const { prepath } = require("../utilities/index.js");
const areaControllers = require('../controllers/areaControllers.js')



const AreaRoutes = (app) => {
    app.get(`${prepath}/area/names`, areaControllers.getNames);
    app.get(`${prepath}/area/names/count`, areaControllers.countNames);
}


module.exports = AreaRoutes
