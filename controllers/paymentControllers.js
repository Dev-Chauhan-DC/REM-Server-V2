const couponServices = require("../services/couponServices");
const userSubscriptionServices = require("../services/userSubscriptionServices");
const razorpayFunc = require("../utilities/razorpay.js");
const responseUtilities = require('../utilities/responseUtilities');
const responses = new responseUtilities()


const generateOrderId = async (req, res) => {

    try {
        const couponCode = req.body.couponCode;
        const planId = req.body.planId;


        const userSubscriptionInfo = await userSubscriptionServices.userSubscriptionInfo(planId)

        if (!userSubscriptionInfo) {

            return res.status(404).send(responses.notFound404())

        }

        let finalPrice = userSubscriptionInfo.price
        let couponId;
        if (couponCode.replace(/\s/g, "").length !== 0) {

            const couponInfo = await couponServices.couponInfo(couponCode)

            if (!couponInfo) {
                return res.status(404).send(responses.notFound404("No Coupon Found"))
            }

            couponId = couponInfo.id

            const percentage = couponInfo.discount_percentage

            finalPrice = finalPrice - ((finalPrice * percentage) / 100);

        }

        if (finalPrice !== 0) {

            const createOrder = await razorpayFunc.createOrder(finalPrice);

            if (createOrder) {

                const aData = {
                    ...createOrder,
                    couponId: couponId
                }
                return res.status(200).send(responses.ok200("", aData))

            }

        }

        if (finalPrice === 0) {
            return res.status(200).send(responses.ok200("free order", { id: "free" }))
        }
    } catch (e) {
        return res.status(500).send(responses.internalServerError500())
    }

}

const createOrder = async (req, res) => {
    try {
        const couponCode = req.body.couponCode;
        const planId = req.body.planId;


        const userSubscriptionInfo = await userSubscriptionServices.userSubscriptionInfo(planId)

        if (!userSubscriptionInfo) {

            return res.status(404).send(responses.notFound404())

        }

        let finalPrice = userSubscriptionInfo.price
        let couponId;
        if (couponCode.replace(/\s/g, "").length !== 0) {

            const couponInfo = await couponServices.couponInfo(couponCode)

            if (!couponInfo) {
                return res.status(404).send(responses.notFound404("No Coupon Found"))
            }

            couponId = couponInfo.id

            const percentage = couponInfo.discount_percentage

            finalPrice = finalPrice - ((finalPrice * percentage) / 100);

        }

        if (finalPrice !== 0) {

            const createOrder = await razorpayFunc.createOrder(finalPrice);

            if (createOrder) {

                const aData = {
                    ...createOrder,
                    couponId: couponId
                }
                return res.status(200).send(responses.ok200("", aData))

            }

        }

        if (finalPrice === 0) {
            const startDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            const endDate = new Date(Date.now() + userSubscriptionInfo.day * 24 * 60 * 60 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');

            const dataCnew = {
                userId: parseInt(req.userId),
                planId: parseInt(planId),
                orderId: 'free',
                segnatureId: 'free',
                paymentId: 'free',
                paidAmount: 0,
                couponId: couponId,
                startDate: startDate,
                endDate: endDate
            }

            const createUserSubscription = await userSubscriptionServices.createUserSubscription(dataCnew);

            const dataDnwke = {
                userId: parseInt(req.userId),
                status: true
            }

            const updateUserisSubscriptionActive = await userSubscriptionServices.updateUserisSubscriptionActive(dataDnwke);


            return res.status(200).send(responses.ok200("free order", { id: "free", ...createUserSubscription, ...updateUserisSubscriptionActive }))
        }
    } catch (e) {
        return res.status(500).send(responses.internalServerError500())
    }
}




module.exports = { generateOrderId, createOrder }
