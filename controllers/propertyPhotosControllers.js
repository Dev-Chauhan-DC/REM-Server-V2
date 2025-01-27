const propertyPhotosServices = require("../services/propertyPhotosServices");
const responseUtilities = require('../utilities/responseUtilities')
const { ok200, notFound404, badRequest400, internalServerError500 } = require("../utilities/responseUtility");
const responses = new responseUtilities()
const propertyServices = require("../services/propertyServices");


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

const destroy = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const propertyPhoto = await propertyPhotosServices.findOne({
            where: {
                id
            }
        })
        if (!propertyPhoto) {
            return res.status(404).send(notFound404())
        }

        const property = await propertyServices.findOne({
            where: {
                id: propertyPhoto.properties_id
            }
        })
        if (!property) {
            return res.status(404).send(notFound404('property not found'))
        }

        if (property.user_id !== req.user.id) {
            return res.status(400).send(badRequest400('not authorized'))
        }


        const response = await propertyPhotosServices.destroy({
            where: {
                id
            }
        });
        return res.status(200).send(ok200("deleted successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const propertyPhoto = await propertyPhotosServices.findOne({
            where: {
                id
            }
        })
        if (!propertyPhoto) {
            return res.status(404).send(notFound404())
        }

        const property = await propertyServices.findOne({
            where: {
                id: propertyPhoto.properties_id
            }
        })
        if (!property) {
            return res.status(404).send(notFound404('property not found'))
        }

        if (property.user_id !== req.user.id) {
            return res.status(400).send(badRequest400('not authorized'))
        }

        const data = req.body;


        const response = await propertyPhotosServices.update({ id }, data);
        return res.status(200).send(ok200("updated successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const create = async (req, res) => {
    try {
        const data = req.body;

        const property = await propertyServices.findOne({
            where: {
                id: data.properties_id
            }
        })
        if (!property) {
            return res.status(404).send(notFound404('property not found'))
        }

        if (property.user_id !== req.user.id) {
            return res.status(400).send(badRequest400('not authorized'))
        }

        const response = await propertyPhotosServices.create(data);
        return res.status(200).send(ok200("created successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}


module.exports = { create, update, destroy, createBulk, createPropertyImages, createPropertyImageFiles }
