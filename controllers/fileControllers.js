const filesServices = require("../services/filesServices");
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility')
const { s3ReadUrl } = require("../utilities/s3");

const createFile = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            type: req.body.type,
            storage_key: req.body.storage_key,
            size: req.body.size
        }

        const response = await filesServices.createFile(data)

        if (!response) {
            return res.status(400).send(badRequest400())
        }

        return res.status(200).send(ok200("File created successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())

    }
}


const readFile = async (req, res) => {
    try {
        const fileId = parseInt(req.body.fileId);

        const url = await s3ReadUrl(fileId)

        if (!url) {
            return res.status(404).send(notFound404("File not found", null))
        }

        return res.status(200).send(ok200("Data sent successfully", url))
    } catch (e) {
        return res.status(500).send(internalServerError500())
    }
}


module.exports = { createFile, readFile }
