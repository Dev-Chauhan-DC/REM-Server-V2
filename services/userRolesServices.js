const UserRolesModel = require("../models/index").user_roles


const getRoles = async () => {

    try {
        const roles = UserRolesModel.findAll()

        return roles

    } catch (e) {
        throw e
    }

}


const create = async (data) => {
    try {
        const response = await UserRolesModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (condition) => {
    try {
        const response = await UserRolesModel.findOne(condition)
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (where, data) => {
    try {
        const response = await UserRolesModel.update(data, {
            where: where,
        })
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (condition) => {
    try {
        const response = await UserRolesModel.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await UserRolesModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}


module.exports = { getRoles, destroy, findAll, create, update, findOne }
