const propertyPhotosServices = require("../services/propertyPhotosServices");
const responseUtilities = require('../utilities/responseUtilities')
const { ok200 } = require("../utilities/responseUtility");
const responses = new responseUtilities()

const createPropertyImages = async (req, res) => {
    try {
        const propertyId = parseInt(req.body.propertyId);
        const imageUrlArray = req.body.photos

        const data = {
            propertyId,
            imageUrlArray
        }
        const response = await propertyPhotosServices.createPropertyImages(data)

        return res.status(200).send(responses.ok200("", response))

    } catch (error) {
        console.error(error)
        return res.status(500).send(responses.internalServerError500())
    }
}

const createPropertyImageFiles = async (req, res) => {
    try {
        const propertyId = parseInt(req.body.propertyId);
        const fileIds = req.body.imageFileIds;


        for (let i = 0; i < fileIds.length; i++) {
            const response = await propertyPhotosServices.createPropertyFile(propertyId, fileIds[i])
        }

        return res.status(200).send(ok200("Photo files created successfully", null))


    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}
const createBulk = async (req, res) => {
    try {
        req.body.map(item => propertyPhotosServices.create({
            properties_id: item.properties_id,
            file_id: item.file_id,
            category_id: item.category_id
        }))

        return res.status(200).send(ok200("created", null))

    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}


module.exports = { createBulk, createPropertyImages, createPropertyImageFiles }
