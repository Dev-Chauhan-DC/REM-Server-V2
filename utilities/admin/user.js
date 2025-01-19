const { parsePhoneNumberFromString } = require('libphonenumber-js');



const isAdmin = (phone) => {
    const phoneFormated = parsePhoneNumberFromString(phone, 'IN').nationalNumber;

    if (phoneFormated === process.env.TESTING_NUMBER) {
        return true;
    }

    return false;
}


module.exports = { isAdmin }