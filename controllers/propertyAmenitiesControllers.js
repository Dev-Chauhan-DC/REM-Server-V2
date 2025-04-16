const propertyAmenitiesServices = require("../services/propertyAmenitiesServices");
const responseUtilities = require('../utilities/responseUtilities')
const responses = new responseUtilities()
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')


const createPropertyAmenities = async (req, res) => {
    try {
        const propertyId = parseInt(req.body.propertyId);
        const amenitiesArray = JSON.parse(req.body.amenitiesArray);
        const arr = [];

        for (let i = 0; i < amenitiesArray.length; i++) {
            arr.push({
                properties_id: propertyId,
                amenities_id: amenitiesArray[i]
            })
        }



        const amenities = await propertyAmenitiesServices.createPropertyAmenities(arr)

        return res.status(200).send(responses.ok200("Amenities created successfully", amenities))

    } catch (error) {
        console.error(error)
        return res.status(500).send(responses.internalServerError500())
    }
}

const bulkUpdate = async (req, res) => {
    try {
        const propertyId = parseInt(req.body.propertyId);
        const ids = req.body.ids;

        // Get existing preference_ids for the property
        const existing = await propertyAmenitiesServices.findAll({
            where: { properties_id: propertyId },
            attributes: ['amenities_id']
        });

        const existingIds = existing.map(e => e.amenities_id);

        // Find ids to add
        const toAdd = ids.filter(id => !existingIds.includes(id));
        const recordsToAdd = toAdd.map(id => ({
            properties_id: propertyId,
            amenities_id: id
        }));

        // Find ids to remove
        const toRemove = existingIds.filter(id => !ids.includes(id));

        // Add new records
        if (recordsToAdd.length) {
            await propertyAmenitiesServices.bulkCreate(recordsToAdd);
        }

        // Remove missing records
        if (toRemove.length) {
            await propertyAmenitiesServices.destroy({
                where: {
                    properties_id: propertyId,
                    amenities_id: toRemove
                }
            });
        }

        return res.status(200).send(ok200("Updated successfully"));
    } catch (e) {
        console.error(e);
        return res.status(500).send(internalServerError500());
    }
};


module.exports = { createPropertyAmenities, bulkUpdate }
