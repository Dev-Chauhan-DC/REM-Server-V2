const jwt = require("jsonwebtoken");
const authServices = require('../services/authServices')
const responseUtilities = require('../utilities/responseUtilities');
const { internalServerError500, ok200, badRequest400 } = require("../utilities/responseUtility");
const responses = new responseUtilities();
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
})
const otpVerification = require('../utilities/2fectorUtility')

const auth = async (req, res) => {

    try {
        const phone = req.body.phone

        const isPhonePresent = await authServices.readPhone(phone);

        if (!isPhonePresent) {

            const isOtpCorrect = true;

            if (!isOtpCorrect) {
                return res.status(400).send(responses.badRequest400("Wrong OTP"))
            }

            const createPhone = await authServices.createPhone(phone);

            if (!createPhone) {
                return res.status(400).send(responses.badRequest400("Unable to create account"))
            }

            const token = jwt.sign({ id: createPhone.id }, process.env.JWT_KEY, { expiresIn: "5d" })
            const data = {
                ...createPhone,
                token
            }

            return res.status(200).send({
                message: "User created successfully",
                success: true,
                data: data,
                authType: "signup"
            })

        }

        const isOtpCorrect = true;

        if (!isOtpCorrect) {
            return res.status(400).send(responses.badRequest400("Incorrect OTP"))
        }

        const token = jwt.sign({ id: isPhonePresent.id }, process.env.JWT_KEY, { expiresIn: "5d" })

        const data = {
            ...isPhonePresent,
            token
        }

        return res.status(200).send({
            message: "Logged in successfully",
            success: true,
            data: data,
            authType: "login"
        })
    } catch (error) {
        return res.status(500).send(responses.internalServerError500())
    }

}

const sendOtp = async (req, res) => {
    try {
        const phone = req.body.phone;

        const { ENV, TESTING_NUMBER } = process.env;

        if (ENV === "development" || phone === TESTING_NUMBER) {
            return res.status(200).send(ok200("Dummy OTP Success"))
        }



        const otpResponse = await client.verify.v2.services(TWILIO_SERVICE_SID).verifications.create(
            {
                to: `+91${phone}`,
                channel: "sms"
            })

        return res.status(200).send(ok200("OTP send Successfully", otpResponse))

    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;
    try {
        const { ENV, TESTING_OTP } = process.env;


        // if (ENV !== "development") {
        //     if (TESTING_OTP != otp) {
        //         const verifyResponse = await client.verify.v2.services(TWILIO_SERVICE_SID).verificationChecks.create(
        //             {
        //                 to: `+91${phone}`,
        //                 code: otp
        //             })

        //         if (!verifyResponse.valid) {
        //             return res.status(400).send(badRequest400("Invalid OTP"))
        //         }
        //     }

        // }
        if (ENV !== "development") {
            if (TESTING_OTP != otp) {
                const verifyOtp = await otpVerification.verifyOtp(phone, otp)

                if (!verifyOtp.status) {
                    return res.status(400).send(badRequest400(verifyOtp.message))
                }
            }

        }


        const isPhonePresent = await authServices.readPhone(phone);

        if (!isPhonePresent) {

            const createPhone = await authServices.createPhone(phone);

            if (!createPhone) {
                return res.status(400).send(responses.badRequest400("Unable to create account"))
            }

            const token = jwt.sign({ id: createPhone.id }, process.env.JWT_KEY, { expiresIn: "10d" })

            const data = {
                ...createPhone,
                token
            }

            return res.status(200).send({
                message: "User created successfully",
                success: true,
                data: data,
                authType: "signup"
            })

        }

        const token = jwt.sign({ id: isPhonePresent.id }, process.env.JWT_KEY, { expiresIn: "10d" })

        const data = {
            ...isPhonePresent,
            token
        }

        return res.status(200).send({
            message: "Logged in successfully",
            success: true,
            data: data,
            authType: "login"
        })

    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}



module.exports = { auth, sendOtp, verifyOtp }
