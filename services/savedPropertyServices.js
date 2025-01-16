const UserModel = require("../models/index").users
const PropertyModel = require("../models/index").properties
const PropertyPhotos = require("../models/index").property_photos
const SavePropertyModel = require("../models/index").saved_properties
const UserRolesModel = require("../models/index").user_roles


const removeSavedProperties = async (userId, propertyId) => {
    try {
        const response = await SavePropertyModel.destroy({
            where: {
                property_id: propertyId,
                user_id: userId
            }
        })

        return response
    } catch (e) {
        throw e
    }
}

const isPropertySaved = async (userId, propertyId) => {

    try {
        const response = await SavePropertyModel.findOne({

            where: {
                property_id: propertyId,
                user_id: userId
            }

        })

        return response
    } catch (e) {
        throw e;
    }


}

const createSaveProperty = async (userId, propertyId) => {
    try {
        const saveProperty = await SavePropertyModel.create({
            property_id: propertyId,
            user_id: userId
        })

        return saveProperty
    } catch (e) {
        throw e;
    }
}

const getSavedProperties = async (userId, sorting, page) => {

    try {
        if (sorting) {
            if (sorting.length >= 2) {
                if (sorting[1] === "highToLow") {
                    sorting[1] = "DESC"
                } else if (sorting[1] === "lowToHigh") {
                    sorting[1] = "ASC"
                }
            } else if (sorting[0] === "relevance") {
                sorting = ["createdAt", "DESC"]
            } else if (sorting[0] === "newest") {
                sorting = ["createdAt", "DESC"]
            }
        }

        const limit = 3;
        const offset = (page - 1) * limit;

        const response = await SavePropertyModel.findAll({
            ...(sorting ?
                {
                    order: [
                        [
                            {
                                model: PropertyModel
                            },
                            sorting[0],
                            sorting[1]
                        ]
                    ]
                }
                :
                {}),
            where: {
                user_id: userId
            },
            include: [
                {
                    model: PropertyModel,
                    attributes: ["latitude", "longitude", "id", "price", "bedroom_count", "bathroom_count", "hall_count", "kitchen_count", "balcony_count", "built_up_area", "address", "landmark", "area", "pincode", "city", "state", "createdAt", "price_on_demand"],
                    include: [
                        {
                            model: PropertyPhotos
                        },
                    ]
                },
                {
                    model: UserModel,
                    attributes: ["agency_name", "company_name"],
                    include: [{ model: UserRolesModel }]
                },
            ],
            limit: limit,
            offset: offset
        })

        return response
    } catch (e) {
        throw e;
    }


}


module.exports = { removeSavedProperties, isPropertySaved, isPropertySaved, createSaveProperty, getSavedProperties }
