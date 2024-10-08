const authControllers = require('../controllers/authControllers')
const otpControllers = require('../controllers/otpControllers')
const authValidator = require('../validators/authValidator')
const validate = require("../middleware/validate");
const { prepath } = require('../utilities');


const authRoutes = (app) => {
    // app.post("/auth/signup", authControllers.auth);
    app.post(`${prepath}/auth/send-otp`, authValidator.sendOtpValidator, validate, otpControllers.sendOtp);
    app.post(`${prepath}/auth/verify-otp-auth`, authValidator.sendOtpValidator, validate, authControllers.verifyOtp);

}


module.exports = authRoutes
