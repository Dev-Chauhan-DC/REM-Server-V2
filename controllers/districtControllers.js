const { internalServerError500, ok200 } = require("../utilities/responseUtility.js");
const districtService = require('../services/districtServices.js')


const getNames = async (req, res) => {
    try {

        const result = await districtService.findAll({
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

        const result = await districtService.count()

        return res.status(200).send(ok200("sent successfully", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

module.exports = { getNames, countNames }