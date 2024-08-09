const interestedPeoplesServices = require("../services/interestedPeoplesServices");
const responseUtilities = require('../utilities/responseUtilities');
const {isNumber} = require("../utilities/validator");
const responses = new responseUtilities()


const getPropertyInterestedPeople = async (req, res) => {
    try {
        const propertyId = parseInt(req.params.property_id)
        const userId = parseInt(req.userId)

        //pagination page
        const page = req.query.page && isNumber(req.query.page) ? parseInt(req.query.page) : 1;



        const response = await interestedPeoplesServices.getPropertyInterestedPeople(propertyId, userId, page)

        return res.status(200).send(responses.ok200("", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}


const createInterestedPerson = async (req, res) => {
    try {
        const propertyId = parseInt(req.body.propertyId);
        const userId = parseInt(req.userId);

        const isPresent = await interestedPeoplesServices.checkIsInterestedPersonPresent(propertyId, userId)

        if (isPresent) {
            return res.status(200).send(responses.ok200("Already present", null))
        }

        const interestedPerson = await interestedPeoplesServices.createInterestedPerson(propertyId, userId)

        return res.status(200).send(responses.ok200("", interestedPerson))

    } catch (error) {
        console.error(error)
        return res.status(500).send(responses.internalServerError500())
    }
}


module.exports = {getPropertyInterestedPeople, createInterestedPerson}
