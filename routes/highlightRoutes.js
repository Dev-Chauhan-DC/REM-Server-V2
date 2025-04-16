const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const highlightControllers = require('../controllers/highlightControllers.js');


const highlightRoutes = (app) => {
    app.post(`${prepath}/highlight/bulk-create`, middlewares.isAuthenticate, highlightControllers.bulkCreate);
    app.put(`${prepath}/highlight/bulk-update`, middlewares.isAuthenticate, highlightControllers.bulkUpdate);


}


module.exports = highlightRoutes
