const CouponeModel = require("../models/index").coupons;


const couponInfo = async (couponCode) => {
    try {
        const response = await CouponeModel.findOne({
            where: {
                code: couponCode
            }
        })
        return response
    } catch (e) {
        throw e;
    }
}


module.exports = {couponInfo}

