const { prepath } = require('../utilities');
const middlewares = require("../middleware/middleware.js");
const builderControllers = require('../controllers/builderControllers.js');


const builderRoutes = (app) => {
    app.post(`${prepath}/builder`, middlewares.isAuthenticate, builderControllers.create);
    app.get(`${prepath}/builder/:id`, builderControllers.read);
    app.get(`${prepath}/builders`, builderControllers.readAll);
    app.get(`${prepath}/builder`, middlewares.isAuthenticate, builderControllers.readCurrent);
    app.put(`${prepath}/builder`, middlewares.isAuthenticate, builderControllers.update);





    // admin
    app.put(`${prepath}/builder/:id`,
        middlewares.isAuthenticate,
        middlewares.checkRole([middlewares.RolesEnum.admin]),
        builderControllers.updateByID);


    app.delete(`${prepath}/admin/builder/:id`,
        middlewares.isAuthenticate,
        middlewares.checkRole([middlewares.RolesEnum.admin]),
        builderControllers.adminDestroy);

}


module.exports = builderRoutes
