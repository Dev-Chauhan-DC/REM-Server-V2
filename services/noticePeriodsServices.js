const NoticePeriodModel = require("../models/index").notice_period


const create = async (data) => {
    try {
        const response = await NoticePeriodModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (condition) => {
    try {
        const response = await NoticePeriodModel.findOne(condition)
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (data, condition) => {
    try {
        const response = await NoticePeriodModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (condition) => {
    try {
        const response = await NoticePeriodModel.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await NoticePeriodModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}


module.exports = { destroy, findAll, create, update, findOne }
