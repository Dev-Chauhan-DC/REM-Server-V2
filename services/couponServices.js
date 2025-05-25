const CouponeModel = require("../models/index").coupons;


const couponInfo = async (couponCode) => {
    try {
        const response = await CouponeModel.findOne({
            where: {
                code: couponCode
            }
        })
        return response
    } catch (e) {
        throw e;
    }
}


const create = async (data) => {
    try {
        const response = await CouponeModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (condition) => {
    try {
        const response = await CouponeModel.findOne(condition)
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (data, condition) => {
    try {
        const response = await CouponeModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (condition) => {
    try {
        const response = await CouponeModel.findAll(condition)
        const plainBuilders = response.map(builder => builder.toJSON());
        return plainBuilders
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await CouponeModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}



module.exports = { couponInfo, destroy, findAll, create, update, findOne }

