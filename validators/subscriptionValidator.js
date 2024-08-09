const { body } = require('express-validator');

const createSubscription = [


    body('planId')
        .notEmpty().withMessage('Please Enter planId'),
    body('orderId')
        .notEmpty().withMessage('Please Enter orderId'),
    body('segnatureId')
        .notEmpty().withMessage('Please Enter segnatureId'),
    body('paymentId')
        .notEmpty().withMessage('Please Enter paymentId'),
    body('paidAmount')
        .notEmpty().withMessage('Please Enter paidAmount')
        .isNumeric().withMessage('Invalid paidAmount'),
    body('couponId')
        .notEmpty().withMessage('Please Enter couponId')

];



module.exports = { createSubscription }