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


module.exports = { create, update, findOne }