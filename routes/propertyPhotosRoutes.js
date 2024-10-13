const middlewares = require("../middleware/middleware.js");
const propertyPhotosControllers = require("../controllers/propertyPhotosControllers");
const { createPropertyImageFilesValidator } = require("../validators/propertyPhotosValidator");
const validate = require('../middleware/validate')
const { prepath } = require('../utilities');


const propertyPhotosRoutes = (app) => {
    // app.post("/list/property/images", propertyPhotosControllers.createPropertyImages);
    app.post(`${prepath}/list/property/images/file/id`,

        createPropertyImageFilesValidator,
        validate,
        propertyPhotosControllers.createPropertyImageFiles);
}

module.exports = propertyPhotosRoutes
