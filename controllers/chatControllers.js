const { where } = require('sequelize');
const chatServices = require('../services/chatServices.js');
const { isAdmin } = require('../utilities/admin/user.js');
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')



const create = async (req, res) => {
    try {

        const result = await chatServices.create(data)

        return res.status(200).send(ok200("created", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}
const get = async (req, res) => {
    try {
        const conversation_id = parseInt(req.params.conversation_id)
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        // const result = await chatServices.findAll({
        //     where: { conversation_id }
        // })
        const result = await chatServices.findAndCountAll({
            page: page ? page : 1,
            limit: limit ? limit : 1,
            where: { conversation_id }

        })

        return res.status(200).send(ok200("sent successfully", result.data, result.meta));
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

module.exports = { get, create }