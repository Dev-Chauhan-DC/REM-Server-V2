const AgentCertificateModel = require("../models/index").agent_certificates;


const create = async (data) => {
    try {
        const response = await AgentCertificateModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await AgentCertificateModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (data, condition) => {
    try {
        const response = await AgentCertificateModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await AgentCertificateModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = { create, findAll, update, destroy }
