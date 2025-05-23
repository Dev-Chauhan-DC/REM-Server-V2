const PropertyAmenities = require("../models/index").property_amenities;

const createPropertyAmenities = async (arr) => {

    try {
        const amenities = await PropertyAmenities.bulkCreate(arr)

        return amenities;
    } catch (e) {
        throw e
    }
}


const create = async (data) => {
    try {
        const response = await PropertyAmenities.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (where) => {
    try {
        const response = await PropertyAmenities.findOne({ where })
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (where, data) => {
    try {
        const response = await PropertyAmenities.update(data, {
            where: where,
        })
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (condition) => {
    try {
        const response = await PropertyAmenities.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await PropertyAmenities.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}
const bulkCreate = async (records) => {
    try {
        const response = await PropertyAmenities.bulkCreate(records);
        return response;
    } catch (e) {
        throw e;
    }
}


module.exports = { createPropertyAmenities, destroy, findAll, create, update, findOne, bulkCreate }


