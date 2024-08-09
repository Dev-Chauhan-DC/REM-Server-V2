const PropertyPhotos = require("../models/index").property_photos;

const createPropertyImages = async (data) => {
    try {
        for (let i = 0; i < data.imageUrlArray.length; i++) {
            const response = await PropertyPhotos.create({
                properties_id: data.propertyId,
                photos: data.imageUrlArray[i]
            })
        }
        return true
    } catch (e) {
        throw e
    }
}


const createPropertyFile = async (propertyId, fileId) => {
    try{
        const response = await PropertyPhotos.create({
            properties_id: propertyId,
            file_id: fileId
        })

        return response;
    }catch (e) {
        throw e;
    }
}

module.exports = {createPropertyImages, createPropertyFile}
