const { internalServerError500, ok200 } = require("../utilities/responseUtility.js");
const areaService = require('../services/areaServices.js')


const getNames = async (req, res) => {
    try {

        const result = await areaService.findAll({
            attributes: ['name']
        })

        return res.status(200).send(ok200("sent successfully", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const countNames = async (req, res) => {
    try {

        const result = await areaService.count()

        return res.status(200).send(ok200("sent successfully", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

module.exports = { getNames, countNames }