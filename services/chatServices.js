const ChatModel = require("../models/index").chat;


const create = async (data) => {
    try {
        const response = await ChatModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await ChatModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}
const update = async (data, condition) => {
    try {
        const response = await ChatModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await ChatModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}

const findAndCountAll = async ({ page = 1, limit = 10, where }) => {
    try {
        const offset = (page - 1) * limit;

        const response = await ChatModel.findAndCountAll({
            distinct: true,
            where: where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });

        return {
            data: response.rows,
            meta: {
                total: response.count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(response.count / limit),
            }
        }
    } catch (e) {
        throw e;
    }
};

module.exports = { create, findAll, update, destroy, findAndCountAll }
