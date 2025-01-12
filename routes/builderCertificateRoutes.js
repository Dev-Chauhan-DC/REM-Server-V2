const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const builderCertificateControllers = require('../controllers/builderCertificateControllers.js');


const BuilderCertificateRoutes = (app) => {
    app.post(`${prepath}/builderCertificate`, middlewares.isAuthenticate, builderCertificateControllers.create);
    // app.get(`${prepath}/builder/:id`, middlewares.isAuthenticate, builderControllers.read);
    app.get(`${prepath}/builderCertificate`, middlewares.isAuthenticate, builderCertificateControllers.get);
    app.put(`${prepath}/builderCertificate/:id`, middlewares.isAuthenticate, builderCertificateControllers.update);
    app.delete(`${prepath}/builderCertificate/:id`, middlewares.isAuthenticate, builderCertificateControllers.destroy);
    app.get(`${prepath}/builderCertificate/builder/:builder_id`, builderCertificateControllers.readAll);


}


module.exports = BuilderCertificateRoutes
