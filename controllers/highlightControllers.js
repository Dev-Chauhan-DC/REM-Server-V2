const highlightServices = require('../services/highlightServices.js');
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')



const bulkCreate = async (req, res) => {
    try {
        const propertyId = parseInt(req.body.propertyId);
        const ids = req.body.ids;

        const records = ids.map(id => ({
            property_id: propertyId,
            highlight_id: id
        }))

        await highlightServices.bulkCreate(records);
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
        const existing = await highlightServices.findAll({
            where: { property_id: propertyId },
            attributes: ['highlight_id']
        });

        const existingIds = existing.map(e => e.highlight_id);

        // Find ids to add
        const toAdd = ids.filter(id => !existingIds.includes(id));
        const recordsToAdd = toAdd.map(id => ({
            property_id: propertyId,
            highlight_id: id
        }));

        // Find ids to remove
        const toRemove = existingIds.filter(id => !ids.includes(id));

        // Add new records
        if (recordsToAdd.length) {
            await highlightServices.bulkCreate(recordsToAdd);
        }

        // Remove missing records
        if (toRemove.length) {
            await highlightServices.destroy({
                where: {
                    property_id: propertyId,
                    highlight_id: toRemove
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