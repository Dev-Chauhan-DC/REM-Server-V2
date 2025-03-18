const ConversationModel = require("../models/index").conversation;


const create = async (data) => {
    try {
        const response = await ConversationModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await ConversationModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}
const update = async (data, condition) => {
    try {
        const response = await ConversationModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await ConversationModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = { create, findAll, update, destroy }
