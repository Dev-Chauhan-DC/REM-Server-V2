const agentCertificatesServices = require('../services/agentCertificateServices.js');
const agentServices = require('../services/agentServices.js');
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')
const { s3ReadUrl } = require('../utilities/s3.js')
const { isNumber } = require("../utilities/validator.js");



const create = async (req, res) => {
    try {

        const agent = await agentServices.findOne({ user_id: parseInt(req.user.id) })

        if (!agent) {
            return res.status(400).send(badRequest400("agent not found", null))
        }


        const data = req.body;
        data.agent_id = agent.id


        const response = await agentCertificatesServices.create(data);
        return res.status(200).send(ok200("created successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}


const get = async (req, res) => {
    try {

        const agent = await agentServices.findOne({ user_id: parseInt(req.user.id) })

        if (!agent) {
            return res.status(400).send(badRequest400("agent not found", null))
        }

        const response = await agentCertificatesServices.findAll({ where: { agent_id: agent.id } });

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
        const agent_id = parseInt(req.params.agent_id);



        const response = await agentCertificatesServices.findAll({ where: { agent_id } });



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


        const agent = await agentServices.findOne({ user_id: parseInt(req.user.id) })

        if (!agent) {
            return res.status(400).send(badRequest400("agent not found", null))
        }

        const response = await agentCertificatesServices.findAll({ where: { agent_id: agent.id } });

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


        const result = await agentCertificatesServices.update(data, {
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


        const agent = await agentServices.findOne({ user_id: parseInt(req.user.id) })

        if (!agent) {
            return res.status(400).send(badRequest400("agent not found", null))
        }

        const response = await agentCertificatesServices.findAll({ where: { agent_id: agent.id } });

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


        const result = await agentCertificatesServices.destroy({
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

module.exports = { create, get, update, destroy, readAll }