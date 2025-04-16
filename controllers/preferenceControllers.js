const preferenceServices = require('../services/preferenceServices.js');
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')



const bulkCreate = async (req, res) => {
    try {
        const propertyId = parseInt(req.body.propertyId);
        const ids = req.body.ids;

        const records = ids.map(id => ({
            property_id: propertyId,
            preference_id: id
        }))
        await preferenceServices.bulkCreate(records);
        return res.status(200).send(ok200("created successfully"))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const bulkUpdate = async (req, res) => {
    try {
        const propertyId = parseInt(req.body.propertyId);
        const ids = req.body.ids;

        // Get existing preference_ids for the property
        const existing = await preferenceServices.findAll({
            where: { property_id: propertyId },
            attributes: ['preference_id']
        });

        const existingIds = existing.map(e => e.preference_id);

        // Find ids to add
        const toAdd = ids.filter(id => !existingIds.includes(id));
        const recordsToAdd = toAdd.map(id => ({
            property_id: propertyId,
            preference_id: id
        }));

        // Find ids to remove
        const toRemove = existingIds.filter(id => !ids.includes(id));

        // Add new records
        if (recordsToAdd.length) {
            await preferenceServices.bulkCreate(recordsToAdd);
        }

        // Remove missing records
        if (toRemove.length) {
            await preferenceServices.destroy({
                where: {
                    property_id: propertyId,
                    preference_id: toRemove
                }
            });
        }

        return res.status(200).send(ok200("Updated successfully"));
    } catch (e) {
        console.error(e);
        return res.status(500).send(internalServerError500());
    }
};


module.exports = { bulkCreate, bulkUpdate }