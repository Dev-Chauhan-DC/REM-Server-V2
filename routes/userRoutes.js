const middlewares = require("../middleware/middleware.js");
const userControllers = require("../controllers/userControllers");
const userValidator = require("../validators/userValidator");
const validate = require("../middleware/validate");
const { prepath } = require('../utilities');



const userRoutes = (app) => {
    // Public
    app.get(`${prepath}/get/user`,
        middlewares.isAuthenticate,
        userControllers.getUser)






    // Protected
    app.get(`${prepath}/user/info/:id`,
        middlewares.isAuthenticate,
        userValidator.getUserV2Validator, validate,
        userControllers.getUserV2
    )

    app.post(`${prepath}/role`,
        middlewares.isAuthenticate,
        userValidator.updateRoleValidator, validate,
        userControllers.updateRole);

    app.post(`${prepath}/update/profile/info`,
        middlewares.isAuthenticate,
        userValidator.updateProfileInfoValidator, validate,
        userControllers.updateProfileInfo);



    app.put(`${prepath}/user`,
        middlewares.isAuthenticate,
        userControllers.userUpdate);
}


module.exports = userRoutes
