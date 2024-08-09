const savePeropertyServices = require("../services/savedPropertyServices");
const responseUtilities = require("../utilities/responseUtilities");
const {isNumber} = require("../utilities/validator");
const {s3ReadUrl} = require("../utilities/s3");
const responses = new responseUtilities();

const createSaveProperty = async (req, res) => {
    try {

        const userId = parseInt(req.userId);
        const propertyId = parseInt(req.body.propertyId);

        const isPropertySaved = await savePeropertyServices.isPropertySaved(userId, propertyId)

        if (isPropertySaved) {
            const removeSavedProperties = await savePeropertyServices.removeSavedProperties(userId, propertyId);

            return res.status(200).send(responses.ok200("", removeSavedProperties))
        } else {
            const saveProperty = await savePeropertyServices.createSaveProperty(userId, propertyId)

            return res.status(200).send(responses.ok200("", saveProperty))
        }


    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
};

const getSavedProperties = async (req, res) => {
    try {
        const sorting = req.query.sorting ? req.query.sorting.split("-") : undefined

        //pagination page
        const page = req.query.page && isNumber(req.query.page) ? parseInt(req.query.page) : 1;

        const userId = parseInt(req.userId)

        const response = await savePeropertyServices.getSavedProperties(userId, sorting, page)


        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < response?.[i]?.property?.property_photos?.length; j++) {
                const fileId = response[i].property.property_photos[j].file_id;
                if (fileId && isNumber(fileId)) {
                    const propertyImageUrl = await s3ReadUrl(fileId)
                    if (propertyImageUrl) {
                        response[i].property.property_photos[j].photos = propertyImageUrl
                    }
                }
            }
        }

        return res.status(200).send(responses.ok200("", response))
    } catch (error) {
        console.error(error)
        return res.status(500).send(responses.internalServerError500())
    }
}


module.exports = {createSaveProperty, getSavedProperties}
