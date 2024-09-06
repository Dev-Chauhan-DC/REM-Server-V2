const otpService = require('../services/otpServices')
const otpWebhook = require('../webhook/2fectorWebhook')
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const responseUtilities = require('../utilities/responseUtilities');
const responses = new responseUtilities()
const moment = require('moment');


const sendOtp = async (req, res) => {
    try {
        const phone = req.params.phone;
        console.log(phone);
        const phoneNumber = parsePhoneNumberFromString(phone, 'IN');
        if (!phoneNumber) {
            return res.status(400).send(responses.badRequest400('Invalid phone number', phone));
        }
        const formatedPhone = phoneNumber.format('E.164');
        const otp = Math.floor(100000 + Math.random() * 900000);

        const sendOtp = await otpWebhook.sendOtp(formatedPhone, otp);

        const isPhonePresent = await otpService.findOtpWhere({
            phone: formatedPhone
        })

        if (isPhonePresent) {
            const updateOtp = await otpService.updateOtp({
                otp: otp
            }, { phone: formatedPhone })
        } else {
            const createOtp = await otpService.createOtp({ phone: formatedPhone, otp: otp });
        }


        return res.status(200).send(responses.ok200('OTP sent successfully', formatedPhone))


    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}

const verifyOtp = async (req, res) => {
    try {
        const phone = req.params.phone;
        const otp = req.params.otp;

        const isPhoneAndOtpPresent = await otpService.findOtpWhere({ phone, otp });

        if (isPhoneAndOtpPresent) {
            const updatedTime = moment(isPhoneAndOtpPresent.updatedAt);
            const currentTime = moment();
            const differenceInMinutes = currentTime.diff(updatedTime, 'minutes');
            if (differenceInMinutes <= 15) {
                return res.status(200).send(responses.badRequest400('Correct OTP', { phone, otp }))
            }
            return res.status(400).send(responses.badRequest400('Expired OTP', { phone, otp }))
        }
        return res.status(400).send(responses.badRequest400('Incorrect OTP', { phone, otp }))

    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}


module.exports = { sendOtp, verifyOtp }
