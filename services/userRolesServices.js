const UserRolesModel = require("../models/index").user_roles


const getRoles = async () => {

    try {
        const roles = UserRolesModel.findAll()

        return roles

    } catch (e) {
        throw e
    }

}

module.exports = {getRoles}
