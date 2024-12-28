const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const builderUpdateControllers = require('../controllers/builderUpdateControllers.js');


const BuilderUpdateRoutes = (app) => {
    app.post(`${prepath}/builderUpdate`, middlewares.isAuthenticate, builderUpdateControllers.create);
    // app.get(`${prepath}/builder/:id`, middlewares.isAuthenticate, builderControllers.read);
    app.get(`${prepath}/builderUpdate`, middlewares.isAuthenticate, builderUpdateControllers.get);
    app.put(`${prepath}/builderUpdate/:id`, middlewares.isAuthenticate, builderUpdateControllers.update);
}


module.exports = BuilderUpdateRoutes
