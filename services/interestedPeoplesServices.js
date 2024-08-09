const UserModel = require("../models/index").users;
const InterestedPeoplesModel = require("../models/index").interested_peoples;
const PropertyModel = require("../models/index").properties;


const getPropertyInterestedPeople = async (propertyId, userId, page) => {

    try {
        const idUserValid = await PropertyModel.findOne({
            where: {
                id: propertyId,
                user_id: userId
            }
        })

        if (!idUserValid) {
            return false
        }
        const limit = 5;
        const offset = (page - 1) * limit;
        const response = await InterestedPeoplesModel.findAll({
            limit: limit,
            offset: offset,
            where: {
                properties_id: propertyId
            },
            include: [
                {
                    model: UserModel,
                    attributes: ["id", "phone_number", "avatar", "first_name", "last_name"]
                }
            ]
        })

        return response

    } catch (e) {
        throw e;
    }

}

const checkIsInterestedPersonPresent = async (propertyId, userId) => {
    try {
        const isInterestedPerson = await InterestedPeoplesModel.findOne({
            where: {
                properties_id: propertyId,
                users_id: userId
            }

        })

        return isInterestedPerson
    } catch (e) {
        throw e;
    }


}

const createInterestedPerson = async (propertyId, userId) => {
    try {
        const interestedPerson = await InterestedPeoplesModel.create({
            properties_id: propertyId,
            users_id: userId
        })

        return interestedPerson
    } catch (e) {
        throw e;
    }
}


module.exports = {
    getPropertyInterestedPeople,
    checkIsInterestedPersonPresent,
    createInterestedPerson
}
