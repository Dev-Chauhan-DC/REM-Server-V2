const DistrictModel = require("../models/index").district;


const create = async (data) => {
    try {
        const response = await DistrictModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await DistrictModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}
const update = async (data, condition) => {
    try {
        const response = await DistrictModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await DistrictModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}

const count = async (query) => {
    try {
        const count = await DistrictModel.count(query);
        return count;
    } catch (e) {
        throw e;
    }
};

module.exports = { create, findAll, update, destroy, count }
