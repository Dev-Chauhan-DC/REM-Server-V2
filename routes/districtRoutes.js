const { prepath } = require("../utilities/index.js");
const districtControllers = require('../controllers/districtControllers.js')



const DistrictRoutes = (app) => {
    app.get(`${prepath}/district/names`, districtControllers.getNames);
    app.get(`${prepath}/district/names/count`, districtControllers.countNames);
}


module.exports = DistrictRoutes
