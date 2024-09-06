const OTPModel = require("../models/index").otp;

const createOtp = async (data) => {
    try {
        const result = await OTPModel.create(data);
        return result;
    } catch (e) {
        throw e
    }
}

const findOtpWhere = async (data) => {
    try {
        const result = await OTPModel.findOne({
            where: data
        })
        return result;
    } catch (e) {
        throw e
    }
}

const updateOtp = async (data, where) => {
    try {
        const result = await OTPModel.update(data, { where })
        return result;
    } catch (e) {
        throw e
    }
}


module.exports = { createOtp, findOtpWhere, updateOtp }