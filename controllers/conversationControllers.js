const conversationServices = require('../services/conversationServices.js');
const { isAdmin } = require('../utilities/admin/user.js');
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')
const propertyService = require('../services/propertyServices.js')


const create = async (req, res) => {
    try {


        const user1_id = parseInt(req.user.id);

        const property = await propertyService.findOne({
            where: {
                id: req.body.property_id
            }
        })

        const user2_id = property.user_id;

        if (typeof user1_id !== 'number' || typeof user2_id !== 'number' || user1_id === user2_id) {
            return res.status(400).send(badRequest400("Either not numbers or the same."));
        }

        const result = await conversationServices.createIfNotPresent(user1_id, user2_id);
        return res.status(200).send(ok200("created", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}
const get = async (req, res) => {
    try {

        const userId = parseInt(req.user.id);

        const result = await conversationServices.getConversationsByUser(userId);
        return res.status(200).send(ok200("sent successfully", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

module.exports = { create, get }