const AgentModel = require("../models/index").agent_profile;


const create = async (data) => {
    try {
        const response = await AgentModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (where) => {
    try {
        const response = await AgentModel.findOne({ where })
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (where, data) => {
    try {
        const response = await AgentModel.update(data, {
            where: where,
        })
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (condition) => {
    try {
        const response = await AgentModel.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await AgentModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}


module.exports = { destroy, findAll, create, update, findOne }