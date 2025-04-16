const PropertyPreferenceModel = require("../models/index").property_preference;


const create = async (data) => {
    try {
        const response = await PropertyPreferenceModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (where) => {
    try {
        const response = await PropertyPreferenceModel.findOne({ where })
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (where, data) => {
    try {
        const response = await PropertyPreferenceModel.update(data, {
            where: where,
        })
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (condition) => {
    try {
        const response = await PropertyPreferenceModel.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await PropertyPreferenceModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}
const bulkCreate = async (records) => {
    try {
        const response = await PropertyPreferenceModel.bulkCreate(records);
        return response;
    } catch (e) {
        throw e;
    }
}


module.exports = { destroy, findAll, create, update, findOne, bulkCreate }