const BuilderCertificateModel = require("../models/index").builder_certificates;


const create = async (data) => {
    try {
        const response = await BuilderCertificateModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await BuilderCertificateModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}

const update = async (data, condition) => {
    try {
        const response = await BuilderCertificateModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

module.exports = { create, findAll, update }
