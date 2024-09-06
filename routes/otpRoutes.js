const { prepath } = require('../utilities');
const sendOtpController = require('../controllers/otpControllers')

const otpRoutes = (app) => {
    app.get(`${prepath}/otp/:phone`, sendOtpController.sendOtp);
    app.get(`${prepath}/otp/verify/:phone/:otp`, sendOtpController.verifyOtp);
}

module.exports = otpRoutes
