const middlewares = require("../middleware/middleware.js");
const userSubscriptionControllers = require("../controllers/userSubscriptionControllers");
const subscriptionValidator = require('../validators/subscriptionValidator.js')
const validate = require("../middleware/validate")
const { prepath } = require('../utilities');


const userSubscription = (app) => {

    app.get(`${prepath}/user/is-subscription-active`, middlewares.isUserSubscriptionActive, userSubscriptionControllers.isUserSubscriptionActive)
    app.post(`${prepath}/payment/user-subscription/successful`, userSubscriptionControllers.userSubscriptionSuccessful);
    app.post(`${prepath}/create/subscription`,
        subscriptionValidator.createSubscription,
        validate,
        userSubscriptionControllers.createSubscription);

}

module.exports = userSubscription
