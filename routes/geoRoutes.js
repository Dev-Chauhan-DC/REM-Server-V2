const middlewares = require("../middleware/middleware.js");
const { prepath } = require('../utilities/index.js');
const geoControllers = require('../controllers/geoControllers.js')

const geoRoutes = (app) => {
    app.get(`${prepath}/geo/autocomplete`,
        geoControllers.autocomplete
    );
    app.post(`${prepath}/geo/place`,
        geoControllers.place
    );
}


module.exports = geoRoutes
