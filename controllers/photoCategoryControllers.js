const photoCategoryService = require('../services/photoCategoryServices.js')
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')
const { Op } = require('sequelize');


const readAll = async (req, res) => {
    try {

        const name = req.query.name ?
            {
                [Op.like]: `%${req.query.name}%`
            } :
            {
                [Op.like]: `%%`
            }

        const response = await photoCategoryService.findAll({
            where: {
                name
            },
            attributes: ['id', 'name'],
        });




        return res.status(200).send(ok200("sent successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

module.exports = { readAll }