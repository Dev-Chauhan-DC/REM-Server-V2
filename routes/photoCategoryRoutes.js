const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const photoCategoryControllers = require('../controllers/photoCategoryControllers.js');


const photoCategoryRoutes = (app) => {
    app.get(`${prepath}/photoCategory`, middlewares.isAuthenticate, photoCategoryControllers.readAll);

}


module.exports = photoCategoryRoutes
