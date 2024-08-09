function isNumber(data) {
    const number = Number(data);
    return !isNaN(number);
}

function isString(value) {
    return typeof value === 'string';
}

function checkStringLength(value, minLength, maxLength) {
    if (typeof value !== 'string') {
        return false;
    }

    const length = value.length;
    if (length < minLength || length > maxLength) {
        return false;
    }

    return true;
}

function isPhoneNumber(phoneNumber) {
    const pattern = /^\d{9,}$/;
    return pattern.test(phoneNumber);
}


module.exports = {isNumber, isString, checkStringLength, isPhoneNumber}
