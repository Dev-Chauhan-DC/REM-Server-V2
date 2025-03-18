const conversationServices = require('../services/conversationServices.js');
const { isAdmin } = require('../utilities/admin/user.js');
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')



const create = async (req, res) => {
    try {

        const result = await conversationServices.create(data)

        return res.status(200).send(ok200("created", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

module.exports = { create }