const BuilderModel = require("../models/index").builders;


const create = async (data) => {
    try {
        const response = await BuilderModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (where) => {
    try {
        const response = await BuilderModel.findOne({ where })
        return response
    } catch (e) {
        throw e;
    }
}
const findAll = async (condition) => {
    try {
        const response = await BuilderModel.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const update = async (where, data) => {
    try {
        const response = await BuilderModel.update(data, {
            where: where,
        })
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await BuilderModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}


module.exports = { destroy, create, update, findOne, findAll }