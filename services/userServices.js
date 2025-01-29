const UserModel = require("../models/index").users;
const UserRoleModel = require("../models/index").user_roles;

const updateRole = async (userId, roleId) => {
    try {
        const role = await UserModel.update(
            {
                user_roles_id: roleId,
            },
            {
                where: {
                    id: userId
                }
            }
        )

        return role
    } catch (e) {
        throw e
    }
}


const getUser = async (userId) => {
    try {
        const user = await UserModel.findOne({
            where: {
                id: userId
            },
            include: [
                {
                    model: UserRoleModel
                }
            ]
        })

        return user
    } catch (e) {
        throw e
    }

}

const updateProfileInfo = async (userId, email, firstName, lastName,
    secondaryNumber, aadhaarNumber, avatar, agencyName,
    companyName) => {

    try {
        const profileInfo = await UserModel.update(
            {
                email: email,
                first_name: firstName,
                last_name: lastName,
                secondary_number: secondaryNumber,
                aadhaar_number: aadhaarNumber,
                avatar: avatar,
                agency_name: agencyName,
                company_name: companyName
            },
            {
                where: { id: userId }
            }
        )

        return profileInfo
    } catch (e) {
        throw e
    }


}

const findOneUser = async (data) => {
    try {
        const user = await UserModel.findOne(data);
        return user;
    } catch (e) {
        console.error(e)
        throw e;
    }
}

const update = async (data, condition) => {
    try {
        const response = await UserModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}





module.exports = { update, updateRole, getUser, updateProfileInfo, findOneUser }
