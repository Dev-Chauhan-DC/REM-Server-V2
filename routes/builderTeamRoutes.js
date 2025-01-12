const { prepath } = require('../utilities');
const middlewares = require("../middleware/middleware.js");
const builderTeamControllers = require('../controllers/builderTeamControllers.js');


const builderTeamRoutes = (app) => {
    app.post(`${prepath}/builderTeam`, middlewares.isAuthenticate, builderTeamControllers.create);
    app.get(`${prepath}/builderTeams/builder/:builder_id`, builderTeamControllers.readAll);
    app.get(`${prepath}/builderTeams`, middlewares.isAuthenticate, builderTeamControllers.get);
    app.put(`${prepath}/builderTeams/:id`, middlewares.isAuthenticate, builderTeamControllers.update);
    app.delete(`${prepath}/builderTeams/:id`, middlewares.isAuthenticate, builderTeamControllers.destroy);
}


module.exports = builderTeamRoutes
