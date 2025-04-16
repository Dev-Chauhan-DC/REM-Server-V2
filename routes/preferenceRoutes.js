const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const preferenceControllers = require('../controllers/preferenceControllers.js');


const preferenceRoutes = (app) => {
    app.post(`${prepath}/preference/bulk-create`, middlewares.isAuthenticate, preferenceControllers.bulkCreate);
    app.put(`${prepath}/preference/bulk-update`, middlewares.isAuthenticate, preferenceControllers.bulkUpdate);
}


module.exports = preferenceRoutes
