const { prepath } = require('../utilities');
const middlewares = require("../middleware/middleware.js");
const builderAddressControllers = require('../controllers/builderAddressControllers.js');


const BuilderAddressRoutes = (app) => {
    app.post(`${prepath}/builderAddress`, middlewares.isAuthenticate, builderAddressControllers.create);
    // app.get(`${prepath}/builder/:id`, middlewares.isAuthenticate, builderControllers.read);
    app.get(`${prepath}/builderAddress`, middlewares.isAuthenticate, builderAddressControllers.get);
    app.put(`${prepath}/builderAddress/:id`, middlewares.isAuthenticate, builderAddressControllers.update);
    app.delete(`${prepath}/builderAddress/:id`, middlewares.isAuthenticate, builderAddressControllers.destroy);
    app.get(`${prepath}/builderAddress/builder/:builder_id`, builderAddressControllers.readAll);


}


module.exports = BuilderAddressRoutes
