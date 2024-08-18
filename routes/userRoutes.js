const middlewares = require("../middleware/middleware.js");
const userControllers = require("../controllers/userControllers");
const userValidator = require("../validators/userValidator");
const validate = require("../middleware/validate");
const { prepath } = require('../utilities');



const userRoutes = (app) => {
    app.get(`${prepath}/get/user`, middlewares.isAuthenticate,
        userControllers.getUser)
    app.post(`${prepath}/role`, middlewares.isAuthenticate,
        userValidator.updateRoleValidator, validate,
        userControllers.updateRole);
    app.post(`${prepath}/update/profile/info`, middlewares.isAuthenticate,
        middlewares.checkSubscription,
        userValidator.updateProfileInfoValidator, validate,
        userControllers.updateProfileInfo);
}


module.exports = userRoutes
