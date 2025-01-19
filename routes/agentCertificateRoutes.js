const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const agentCertificateControllers = require('../controllers/agentCertificateControllers.js');


const AgentCertificateRoutes = (app) => {
    app.post(`${prepath}/agentCertificate`, middlewares.isAuthenticate, agentCertificateControllers.create);
    // app.get(`${prepath}/builder/:id`, middlewares.isAuthenticate, builderControllers.read);
    app.get(`${prepath}/agentCertificate`, middlewares.isAuthenticate, agentCertificateControllers.get);
    app.put(`${prepath}/agentCertificate/:id`, middlewares.isAuthenticate, agentCertificateControllers.update);
    app.delete(`${prepath}/agentCertificate/:id`, middlewares.isAuthenticate, agentCertificateControllers.destroy);
    app.get(`${prepath}/agentCertificate/agent/:agent_id`, agentCertificateControllers.readAll);


    // admin
    app.post(`${prepath}/admin/agentCertificate`, middlewares.isAuthenticate, agentCertificateControllers.adminCreate);
    app.put(`${prepath}/admin/agentCertificate/:id`, middlewares.isAuthenticate, agentCertificateControllers.adminUpdate);
    app.delete(`${prepath}/admin/agentCertificate/:id`, middlewares.isAuthenticate, agentCertificateControllers.adminDestroy);


}


module.exports = AgentCertificateRoutes
