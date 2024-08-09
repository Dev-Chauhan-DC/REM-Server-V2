const Razorpay = require('razorpay');
const uuid = require('uuid');


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});



const createOrder = async (actualAmount) => {
    try {
        const options = {
            amount: actualAmount * 100, // amount in the smallest currency unit (e.g., paise for INR)
            currency: 'INR',
            receipt: uuid.v4(),
        };

        const order = await razorpay.orders.create(options);
        return order

    } catch (e) {
        throw e;
    }
};


const getPaymentInfo = async (paymentId) => {
    try {
        const result = await razorpay.payments.fetch(paymentId)
        return result;
    } catch (e) {
        console.error(e)
        throw e;
    }
}


module.exports = { createOrder, getPaymentInfo }
