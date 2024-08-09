const PropertyAmenities = require("../models/index").property_amenities;

const createPropertyAmenities = async (arr) => {

    try{
        const amenities = await PropertyAmenities.bulkCreate(arr)

        return amenities;
    }catch (e) {
        throw e
    }
}


module.exports = {createPropertyAmenities}
