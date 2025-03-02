const StateModel = require("../models/index").state;


const create = async (data) => {
    try {
        const response = await StateModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await StateModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}
const update = async (data, condition) => {
    try {
        const response = await StateModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await StateModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}

const count = async (query) => {
    try {
        const count = await StateModel.count(query);
        return count;
    } catch (e) {
        throw e;
    }
};

module.exports = { create, findAll, update, destroy, count }
