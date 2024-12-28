const BuilderTeamModel = require("../models/index").builder_team;


const create = async (data) => {
    try {
        const response = await BuilderTeamModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await BuilderTeamModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}


const update = async (data, condition) => {
    try {
        const response = await BuilderTeamModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await BuilderTeamModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = { create, findAll, update, destroy }
