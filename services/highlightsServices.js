const HighlightModel = require("../models/index").highlight


const create = async (data) => {
    try {
        const response = await HighlightModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (condition) => {
    try {
        const response = await HighlightModel.findOne(condition)
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (data, condition) => {
    try {
        const response = await HighlightModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (condition) => {
    try {
        const response = await HighlightModel.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await HighlightModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}


module.exports = { destroy, findAll, create, update, findOne }
