const UserSubscriptionModel = require("../models/index").user_subscriptions;
const UserModel = require("../models/index").users
const UserSubscriptionPlan = require('../models/index').subscription_plans

const userSubscriptionInfo = async (planId) => {
    try {
        const response = await UserSubscriptionPlan.findOne({
            where: {
                id: planId
            }
        })
        return response
    } catch (e) {
        throw e;
    }
}

const createUserSubscription = async (data) => {
    try {
        const response = await UserSubscriptionModel.create({
            user_id: data.userId,
            plan_id: data.planId,
            start_date: data.startDate,
            end_date: data.endDate,
            order_id: data.orderId,
            segnature_id: data.segnatureId,
            payment_id: data.paymentId,
            paid_amount: data.paidAmount,
            coupon_id: data.couponId
        })

        return response
    } catch (e) {
        throw e;
    }
}

const updateUserisSubscriptionActive = async (data) => {
    try {
        const response = await UserModel.update(
            {
                is_subscription_active: data.status ? 1 : 0
            }
            , {
                where: {
                    id: data.userId
                }
            })

        return response
    } catch (e) {
        throw e;
    }
}



module.exports = {userSubscriptionInfo, createUserSubscription, updateUserisSubscriptionActive}
