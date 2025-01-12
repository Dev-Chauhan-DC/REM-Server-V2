const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const agentControllers = require('../controllers/agentControllers.js');


const agentRoutes = (app) => {
    app.post(`${prepath}/agent`, middlewares.isAuthenticate, agentControllers.create);
    app.get(`${prepath}/agent/:id`, agentControllers.read);
    app.get(`${prepath}/agents`, agentControllers.readAll);
    app.get(`${prepath}/agent`, middlewares.isAuthenticate, agentControllers.readCurrent);
    app.put(`${prepath}/agent`, middlewares.isAuthenticate, agentControllers.update);

}


module.exports = agentRoutes
