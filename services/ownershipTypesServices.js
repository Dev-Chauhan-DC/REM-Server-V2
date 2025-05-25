const OwnershipTypesModel = require("../models/index").ownership_types


const create = async (data) => {
    try {
        const response = await OwnershipTypesModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (condition) => {
    try {
        const response = await OwnershipTypesModel.findOne(condition)
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (data, condition) => {
    try {
        const response = await OwnershipTypesModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (condition) => {
    try {
        const response = await OwnershipTypesModel.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await OwnershipTypesModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}


module.exports = { destroy, findAll, create, update, findOne }
