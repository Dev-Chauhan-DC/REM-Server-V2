const UserModel = require("../models/index").users;


const readPhone = async (phone) => {

    try {
        const isPhonePresent = await UserModel.findOne({
            where: {
                phone_number: phone
            }
        })
        return isPhonePresent;

    } catch (e) {
        console.error(e)
        throw e
    }



}

const createPhone = async (phone) => {
    try {
        const addPhone = await UserModel.create({
            phone_number: phone
        })

        return addPhone
    } catch (e) {
        console.error(e)
        throw e
    }

}


module.exports = { readPhone, createPhone }
