const PropertyPhotos = require("../models/index").property_photos;

const createPropertyImages = async (data) => {
    try {
        for (let i = 0; i < data.imageUrlArray.length; i++) {
            const response = await PropertyPhotos.create({
                properties_id: data.propertyId,
                photos: data.imageUrlArray[i]
            })
        }
        return true
    } catch (e) {
        throw e
    }
}


const createPropertyFile = async (propertyId, fileId) => {
    try {
        const response = await PropertyPhotos.create({
            properties_id: propertyId,
            file_id: fileId
        })

        return response;
    } catch (e) {
        throw e;
    }
}

const create = async (data) => {
    try {
        const response = await PropertyPhotos.create(data)
        return response
    } catch (e) {
        throw e;
    }
}


const findOne = async (condition) => {
    try {
        const response = await PropertyPhotos.findOne(condition)
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (where, data) => {
    try {
        const response = await PropertyPhotos.update(data, {
            where: where,
        })
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (condition) => {
    try {
        const response = await PropertyPhotos.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await PropertyPhotos.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}


module.exports = { destroy, findAll, findOne, update, create, createPropertyImages, createPropertyFile }
