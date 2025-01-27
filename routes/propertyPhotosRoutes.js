const middlewares = require("../middleware/middleware.js");
const propertyPhotosControllers = require("../controllers/propertyPhotosControllers");
const { createPropertyImageFilesValidator } = require("../validators/propertyPhotosValidator");
const validate = require('../middleware/validate')
const { prepath } = require('../utilities');


const propertyPhotosRoutes = (app) => {
    // app.post("/list/property/images", propertyPhotosControllers.createPropertyImages);


    // Protected
    app.post(`${prepath}/list/property/images/file/id`,
        middlewares.isAuthenticate,
        createPropertyImageFilesValidator,
        validate,
        propertyPhotosControllers.createPropertyImageFiles);

    app.post(`${prepath}/propertyPhoto/bulk`,
        middlewares.isAuthenticate,
        propertyPhotosControllers.createBulk);

    app.delete(`${prepath}/propertyPhoto/:id`, middlewares.isAuthenticate, propertyPhotosControllers.destroy);
    app.put(`${prepath}/propertyPhoto/:id`, middlewares.isAuthenticate, propertyPhotosControllers.update);
    app.post(`${prepath}/propertyPhoto`, middlewares.isAuthenticate, propertyPhotosControllers.create);

}

module.exports = propertyPhotosRoutes
