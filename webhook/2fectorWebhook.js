const axios = require('axios')

const sendOtp = async (phone, otp) => {
    try {
        const response = await axios.get(`https://2factor.in/API/V1/${process.env.API_KEY_2FECTOR}/SMS/${phone}/${otp}/OTP1`);
        return response;
    } catch (e) {
        throw e
    }
}




module.exports = { sendOtp }