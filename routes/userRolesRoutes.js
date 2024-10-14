const middlewares = require("../middleware/middleware.js");
const userRolesControllers = require("../controllers/userRolesControllers");
const { prepath } = require('../utilities');





const userRolesRoutes = (app) => {
    app.get(`${prepath}/roles`, userRolesControllers.getRoles);
}


module.exports = userRolesRoutes

