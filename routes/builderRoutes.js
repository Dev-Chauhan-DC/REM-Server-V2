const { prepath } = require('../utilities');
const middlewares = require("../middleware/middleware.js");
const builderControllers = require('../controllers/builderControllers.js');


const builderRoutes = (app) => {
    app.post(`${prepath}/builder`, middlewares.isAuthenticate, builderControllers.create);
    app.get(`${prepath}/builder/:id`, middlewares.isAuthenticate, builderControllers.read);
    app.get(`${prepath}/builder`, middlewares.isAuthenticate, builderControllers.readCurrent);
    app.put(`${prepath}/builder`, middlewares.isAuthenticate, builderControllers.update);
}


module.exports = builderRoutes
