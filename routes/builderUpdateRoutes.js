const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const builderUpdateControllers = require('../controllers/builderUpdateControllers.js');


const BuilderUpdateRoutes = (app) => {
    app.post(`${prepath}/builderUpdate`, middlewares.isAuthenticate, builderUpdateControllers.create);
    // app.get(`${prepath}/builder/:id`, middlewares.isAuthenticate, builderControllers.read);
    app.get(`${prepath}/builderUpdate`, middlewares.isAuthenticate, builderUpdateControllers.get);
    app.put(`${prepath}/builderUpdate/:id`, middlewares.isAuthenticate, builderUpdateControllers.update);
    app.delete(`${prepath}/builderUpdate/:id`, middlewares.isAuthenticate, builderUpdateControllers.destroy);
    app.get(`${prepath}/builderUpdate/builder/:builder_id`, builderUpdateControllers.readAll);

    // admin
    app.post(`${prepath}/admin/builderUpdate`,
        middlewares.isAuthenticate,
        middlewares.checkRole([middlewares.RolesEnum.admin]),
        builderUpdateControllers.adminCreate);


    app.put(`${prepath}/admin/builderUpdate/:id`,
        middlewares.isAuthenticate,
        middlewares.checkRole([middlewares.RolesEnum.admin]),
        builderUpdateControllers.adminUpdate);


    app.delete(`${prepath}/admin/builderUpdate/:id`,
        middlewares.isAuthenticate,
        middlewares.checkRole([middlewares.RolesEnum.admin]),
        builderUpdateControllers.adminDestroy);




}


module.exports = BuilderUpdateRoutes
