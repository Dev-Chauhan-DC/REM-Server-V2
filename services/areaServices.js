const AreaModel = require("../models/index").area;


const create = async (data) => {
    try {
        const response = await AreaModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await AreaModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}
const update = async (data, condition) => {
    try {
        const response = await AreaModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await AreaModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}

const count = async (query) => {
    try {
        const count = await AreaModel.count(query);
        return count;
    } catch (e) {
        throw e;
    }
};

module.exports = { create, findAll, update, destroy, count }
