const middlewares = require("../middleware/middleware.js");
const paymentControllers = require("../controllers/paymentControllers");
const fileControllers = require('../controllers/fileControllers')
const fileValidator = require('../validators/fileValidator')
const { prepath } = require('../utilities');

const fileRoutes = (app) => {
    app.post(`${prepath}/file/create`,
        middlewares.isAuthenticate,
        fileValidator.createFile,
        fileControllers.createFile);

    app.post(`${prepath}/file/read`,
        middlewares.isAuthenticate,
        fileControllers.readFile);



}


module.exports = fileRoutes
