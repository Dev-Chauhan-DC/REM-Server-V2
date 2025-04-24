const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const mealControllers = require('../controllers/mealControllers.js');


const mealRoutes = (app) => {
    app.post(`${prepath}/meal/bulk-create`, middlewares.isAuthenticate, mealControllers.bulkCreate);
    app.put(`${prepath}/meal/bulk-update`, middlewares.isAuthenticate, mealControllers.bulkUpdate);


}


module.exports = mealRoutes
