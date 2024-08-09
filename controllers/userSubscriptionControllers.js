const responseUtilities = require('../utilities/responseUtilities');
const userSubscriptionServices = require("../services/userSubscriptionServices");
const { getPaymentInfo } = require('../utilities/razorpay');
const responses = new responseUtilities();

const isUserSubscriptionActive = async (req, res) => {
    try {
        return res.status(200).send(responses.ok200())
    } catch (e) {
        return res.status(500).send(responses.internalServerError500())
    }

}

const userSubscriptionSuccessful = async (req, res) => {
    try {
        const planId = req.body.planId;

        const userSubscriptionInfo = await userSubscriptionServices.userSubscriptionInfo(planId);
        if (!userSubscriptionInfo) return res.status(404).send(responses.notFound404("No plan found", null))

        const planDays = userSubscriptionInfo.day
        const startDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        const endDate = new Date(Date.now() + planDays * 24 * 60 * 60 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');

        const data = {
            userId: parseInt(req.userId),
            planId: parseInt(req.body.planId),
            orderId: req.body.orderId,
            segnatureId: req.body.segnatureId,
            paymentId: req.body.paymentId,
            paidAmount: parseInt(req.body.paidAmount),
            couponId: parseInt(req.body.couponId),
            startDate: startDate,
            endDate: endDate
        }

        const createUserSubscription = await userSubscriptionServices.createUserSubscription(data);

        const bData = {
            userId: parseInt(req.userId),
            status: true
        }

        const updateUserisSubscriptionActive = await userSubscriptionServices.updateUserisSubscriptionActive(bData);

        return res.status(200).send(responses.ok200("User subscription created successfully", createUserSubscription))

    } catch (e) {
        return res.status(500).send(responses.internalServerError500())
    }


}

const createSubscription = async (req, res) => {
    try {


        const confirmPayment = await getPaymentInfo(req.body.paymentId);

        const planId = req.body.planId;

        const userSubscriptionInfo = await userSubscriptionServices.userSubscriptionInfo(planId);
        if (!userSubscriptionInfo) return res.status(404).send(responses.notFound404("No plan found", null))

        const planDays = userSubscriptionInfo.day
        const startDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        const endDate = new Date(Date.now() + planDays * 24 * 60 * 60 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');

        const data = {
            userId: parseInt(req.userId),
            planId: parseInt(req.body.planId),
            orderId: req.body.orderId,
            segnatureId: req.body.segnatureId,
            paymentId: req.body.paymentId,
            paidAmount: parseInt(req.body.paidAmount),
            couponId: parseInt(req.body.couponId),
            startDate: startDate,
            endDate: endDate
        }

        const createUserSubscription = await userSubscriptionServices.createUserSubscription(data);

        const bData = {
            userId: parseInt(req.userId),
            status: true
        }

        const updateUserisSubscriptionActive = await userSubscriptionServices.updateUserisSubscriptionActive(bData);

        return res.status(200).send(responses.ok200("User subscription created successfully", createUserSubscription))

    } catch (e) {
        return res.status(500).send(responses.internalServerError500())
    }


}



module.exports = { isUserSubscriptionActive, userSubscriptionSuccessful, createSubscription }
