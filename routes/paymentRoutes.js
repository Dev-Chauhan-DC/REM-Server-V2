const middlewares = require("../middleware/middleware.js");
const paymentControllers = require("../controllers/paymentControllers");
const { prepath } = require('../utilities');


const paymentRoutes = (app) => {
    app.post(`${prepath}/payment/generate-order-id`, paymentControllers.generateOrderId);
    app.post(`${prepath}/payment/create/order`, paymentControllers.createOrder);
}


module.exports = paymentRoutes
