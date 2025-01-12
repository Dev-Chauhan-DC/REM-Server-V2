const BuilderAddressModel = require("../models/index").builder_addresses;


const create = async (data) => {
    try {
        const response = await BuilderAddressModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await BuilderAddressModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}
const update = async (data, condition) => {
    try {
        const response = await BuilderAddressModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await BuilderAddressModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = { create, findAll, update, destroy }
