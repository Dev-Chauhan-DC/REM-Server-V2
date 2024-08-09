const propertyAmenitiesServices = require("../services/propertyAmenitiesServices");
const responseUtilities = require('../utilities/responseUtilities')
const responses = new responseUtilities()

const createPropertyAmenities = async (req, res) => {
    try {
        const propertyId = parseInt(req.body.propertyId);
        const amenitiesArray = JSON.parse(req.body.amenitiesArray);
        const arr = [];

        for (let i = 0; i < amenitiesArray.length; i++) {
            arr.push({
                properties_id: propertyId,
                amenities_id: amenitiesArray[i]
            })
        }



        const amenities = await propertyAmenitiesServices.createPropertyAmenities(arr)

        return res.status(200).send(responses.ok200("Amenities created successfully", amenities))

    } catch (error) {
        console.error(error)
        return res.status(500).send(responses.internalServerError500())
    }
}


module.exports = {createPropertyAmenities}
