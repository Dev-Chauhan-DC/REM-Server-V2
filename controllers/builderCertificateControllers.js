const builderCertificatesServices = require('../services/builderCertificateServices.js');
const builderServices = require('../services/builderServices.js');
const { isAdmin } = require('../utilities/admin/user.js');
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')
const { s3ReadUrl } = require('../utilities/s3.js')
const { isNumber } = require("../utilities/validator");



const create = async (req, res) => {
    try {

        const builder = await builderServices.findOne({ user_id: parseInt(req.user.id) })

        if (!builder) {
            return res.status(400).send(badRequest400("builder not found", null))
        }


        const data = req.body;
        data.builder_id = builder.id


        const response = await builderCertificatesServices.create(data);
        return res.status(200).send(ok200("created successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const adminCreate = async (req, res) => {
    try {
        // if (!isAdmin(req.user.phone_number)) {
        //     return res.status(404).send(badRequest400('You are not authorized'))
        // }
        const data = req.body;
        const response = await builderCertificatesServices.create(data);
        return res.status(200).send(ok200("created successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const get = async (req, res) => {
    try {

        const builder = await builderServices.findOne({ user_id: parseInt(req.user.id) })

        if (!builder) {
            return res.status(400).send(badRequest400("builder not found", null))
        }

        const response = await builderCertificatesServices.findAll({ where: { builder_id: builder.id } });

        for (let i = 0; i < response.length; i++) {

            const fileId = response[i].file;

            if (fileId && isNumber(fileId)) {
                const ImageUrl = await s3ReadUrl(fileId)
                if (ImageUrl) {
                    response[i].file = ImageUrl
                }
            }
        }


        return res.status(200).send(ok200("sent successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const readAll = async (req, res) => {
    try {
        const builder_id = parseInt(req.params.builder_id);



        const response = await builderCertificatesServices.findAll({ where: { builder_id } });



        for (let i = 0; i < response.length; i++) {

            const fileId = response[i].file;

            if (fileId && isNumber(fileId)) {
                const ImageUrl = await s3ReadUrl(fileId)
                if (ImageUrl) {
                    response[i].file = ImageUrl
                }
            }
        }


        return res.status(200).send(ok200("sent successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const update = async (req, res) => {
    try {


        const builder = await builderServices.findOne({ user_id: parseInt(req.user.id) })

        if (!builder) {
            return res.status(400).send(badRequest400("builder not found", null))
        }

        const response = await builderCertificatesServices.findAll({ where: { builder_id: builder.id } });

        let isMatched = false;

        const data = req.body
        const id = req.params.id

        response.map((item) => {
            if (item.id === parseInt(id)) {
                isMatched = true
            }
        })

        if (!isMatched) {
            return res.status(400).send(badRequest400("not found", null))
        }


        const result = await builderCertificatesServices.update(data, {
            where: {
                id: parseInt(id)
            }
        },);



        return res.status(200).send(ok200("updated successfully", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const adminUpdate = async (req, res) => {
    try {
        // if (!isAdmin(req.user.phone_number)) {
        //     return res.status(404).send(badRequest400('You are not authorized'))
        // }

        const data = req.body
        const id = req.params.id


        const result = await builderCertificatesServices.update(data, {
            where: {
                id: parseInt(id)
            }
        },);



        return res.status(200).send(ok200("updated successfully", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const destroy = async (req, res) => {
    try {


        const builder = await builderServices.findOne({ user_id: parseInt(req.user.id) })

        if (!builder) {
            return res.status(400).send(badRequest400("builder not found", null))
        }

        const response = await builderCertificatesServices.findAll({ where: { builder_id: builder.id } });

        let isMatched = false;

        const data = req.body
        const id = req.params.id

        response.map((item) => {
            if (item.id === parseInt(id)) {
                isMatched = true
            }
        })

        if (!isMatched) {
            return res.status(400).send(badRequest400("not found", null))
        }


        const result = await builderCertificatesServices.destroy({
            where: {
                id: parseInt(id)
            }
        },);



        return res.status(200).send(ok200("deleted successfully", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const adminDestroy = async (req, res) => {
    try {
        // if (!isAdmin(req.user.phone_number)) {
        //     return res.status(404).send(badRequest400('You are not authorized'))
        // }

        const id = req.params.id


        const result = await builderCertificatesServices.destroy({
            where: {
                id: parseInt(id)
            }
        },);



        return res.status(200).send(ok200("deleted successfully", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

module.exports = { adminDestroy, adminUpdate, adminCreate, create, get, update, destroy, readAll }