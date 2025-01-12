const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const agentAddressControllers = require('../controllers/agentAddressControllers.js');


const AgentAddressRoutes = (app) => {
    app.post(`${prepath}/agentAddress`, middlewares.isAuthenticate, agentAddressControllers.create);
    app.get(`${prepath}/agentAddress`, middlewares.isAuthenticate, agentAddressControllers.get);
    app.put(`${prepath}/agentAddress/:id`, middlewares.isAuthenticate, agentAddressControllers.update);
    app.delete(`${prepath}/agentAddress/:id`, middlewares.isAuthenticate, agentAddressControllers.destroy);
    app.get(`${prepath}/agentAddress/agent/:agent_id`, agentAddressControllers.readAll);
}


module.exports = AgentAddressRoutes
