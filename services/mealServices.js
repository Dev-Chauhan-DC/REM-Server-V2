const PropertyMealModel = require("../models/index").property_meal_types;


const create = async (data) => {
    try {
        const response = await PropertyMealModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (where) => {
    try {
        const response = await PropertyMealModel.findOne({ where })
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (where, data) => {
    try {
        const response = await PropertyMealModel.update(data, {
            where: where,
        })
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (condition) => {
    try {
        const response = await PropertyMealModel.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await PropertyMealModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}
const bulkCreate = async (records) => {
    try {
        const response = await PropertyMealModel.bulkCreate(records);
        return response;
    } catch (e) {
        throw e;
    }
}


module.exports = { destroy, findAll, create, update, findOne, bulkCreate }