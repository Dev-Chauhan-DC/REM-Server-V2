const BuilderUpdateModel = require("../models/index").builder_updates;


const create = async (data) => {
    try {
        const response = await BuilderUpdateModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await BuilderUpdateModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (data, condition) => {
    try {
        const response = await BuilderUpdateModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

module.exports = { create, findAll, update }
