const otpService = require('../services/otpServices')
const responseUtilities = require('./responseUtilities');
const responses = new responseUtilities()
const moment = require('moment');

const verifyOtp = async (phone, otp) => {
    try {
        const isPhoneAndOtpPresent = await otpService.findOtpWhere({ phone, otp });

        if (isPhoneAndOtpPresent) {
            const updatedTime = moment(isPhoneAndOtpPresent.updatedAt);
            const currentTime = moment();
            const differenceInMinutes = currentTime.diff(updatedTime, 'minutes');
            if (differenceInMinutes <= 15) {
                return { status: true, message: 'Correct OTP' }
            }

            return { status: false, message: 'Expired OTP' }
        }
        return { status: false, message: 'Incorrect OTP' }

    } catch (e) {
        console.error(e)
        return { status: false, message: 'Server Error' }
    }
}


module.exports = { verifyOtp }