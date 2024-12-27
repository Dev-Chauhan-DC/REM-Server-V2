const { prepath } = require('../utilities');
const middlewares = require("../middleware/middleware.js");
const builderTeamControllers = require('../controllers/builderTeamControllers.js');


const builderTeamRoutes = (app) => {
    app.post(`${prepath}/builderTeam`, middlewares.isAuthenticate, builderTeamControllers.create);
    // app.get(`${prepath}/builder/:id`, middlewares.isAuthenticate, builderControllers.read);
    app.get(`${prepath}/builderTeams`, middlewares.isAuthenticate, builderTeamControllers.get);
    app.put(`${prepath}/builderTeams/:id`, middlewares.isAuthenticate, builderTeamControllers.update);
}


module.exports = builderTeamRoutes
