const photoCategoryService = require('../services/photoCategoryServices.js')
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')


const readAll = async (req, res) => {
    try {

        const response = await photoCategoryService.findAll();


        return res.status(200).send(ok200("sent successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

module.exports = { readAll }