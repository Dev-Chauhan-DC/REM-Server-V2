const AgentAddressModel = require("../models/index").agent_addresses;


const create = async (data) => {
    try {
        const response = await AgentAddressModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await AgentAddressModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}
const update = async (data, condition) => {
    try {
        const response = await AgentAddressModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await AgentAddressModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = { create, findAll, update, destroy }
