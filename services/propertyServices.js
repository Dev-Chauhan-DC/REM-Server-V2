const { Op } = require("sequelize");
const UserModel = require("../models/index").users
const BuilderModel = require("../models/index").builders
const AgentModel = require("../models/index").agent_profile
const PropertyModel = require("../models/index").properties
const PropertyAmenities = require("../models/index").property_amenities
const PropertyPhotos = require("../models/index").property_photos
const InterestedPeoplesModel = require("../models/index").interested_peoples
const SavePropertyModel = require("../models/index").saved_properties
const AmenityModel = require("../models/index").amenities
const PurposeModel = require("../models/index").purposes
const HomeTypeModel = require("../models/index").home_types
const FacingModel = require("../models/index").facings
const FlooringTypeModel = require("../models/index").flooring_types
const OwnershipTypeModel = require("../models/index").ownership_types
const AvailabilityTypeModel = require("../models/index").availability_types
const FurnishingsModel = require("../models/index").furnishings
const KitchenTypesModel = require("../models/index").kitchen_types
const WaterSuppliesModel = require("../models/index").water_supplies
const PowerBackupsModel = require("../models/index").power_backups
const PossessionsModel = require("../models/index").possessions
const TenantsModel = require("../models/index").tenants
const UserRolesModel = require("../models/index").user_roles
const UserSubscriptionPlan = require("../models/index").subscription_plans
const CouponeModel = require("../models/index").coupons
const UserSubscriptionModel = require("../models/index").user_subscriptions
const PhotoCategoryModel = require("../models/index").property_photo_categories;


const createProperty = async (data) => {

    try {

        const property = await PropertyModel.create({
            user_id: data.userId,
            purpose_id: data.purposeId,
            home_types_id: data.homeTypeId,
            address: data.address,
            landmark: data.landmark,
            area: data.area,
            pincode: data.pincode,
            city: data.city,
            state: data.state,
            bedroom_count: data.bedroomCount,
            bathroom_count: data.bathroomCount,
            hall_count: data.hallCount,
            kitchen_count: data.kitchenCount,
            balcony_count: data.balconyCount,
            built_up_area: data.builtUpArea,
            carpet_area: data.carpetArea,
            plot_area: data.plotArea,
            facing_id: data.facingId,
            property_age: data.propertyAge,
            total_floor: data.totalFloor,
            property_floor: data.propertyFloor,
            flooring_types_id: data.flooringTypeId,
            ownership_types_id: data.ownershipTypeId,
            latitude: data.latitude,
            longitude: data.longitude,
            price: data.price,
            negotiable: data.negotiable,
            maintenance: data.maintenance,
            currently_under_loan: data.currentlyUnderLoan,
            availability_types_id: data.availabilityTypeId,
            furnishings_id: data.furnishingsId,
            parking_slot_two_wheeler_count: data.parkingSlotTwoWheelerCount,
            parking_slot_four_wheeler_count: data.parkingSlotFourWheelerCount,
            cupboard: data.cupboard,
            kitchen_types_id: data.kitchenTypesId,
            property_description: data.propertyDescription,
            gated_security: data.gatedSecurity,
            gym: data.gym,
            water_supplies_id: data.waterSuppliesId,
            power_backups_id: data.powerBackupsId,
            corner_property: data.cornerProperty,
            verified_property: data.verifiedProperty,
            agent_certification: data.agentCertification,
            possessions_id: data.possessionsId,
            flats_in_building: data.flatsInBuilding,
            deposit: data.deposit,
            tenants_id: data.tenantsId
        })

        return property

    } catch (e) {
        throw e
    }

}

const getUserProperties = async (userId, page, ALimit) => {

    try {
        const limit = ALimit ? ALimit : 3
        const offset = (page - 1) * limit;
        const properties = await PropertyModel.findAll({
            limit: limit,
            offset: offset,
            where: {
                user_id: userId
            },
            attributes: ["id", "price", "price_on_demand", "bedroom_count", "bathroom_count", "hall_count", "kitchen_count", "balcony_count", "built_up_area", "address", "landmark", "area", "pincode", "city", "state", "createdAt"],
            include: [
                {
                    model: PropertyPhotos,
                    include: [
                        {
                            model: PhotoCategoryModel,
                            attributes: ["name", "id"]

                        }

                    ]
                },
                {
                    model: UserModel,
                    attributes: ["agency_name", "company_name"],
                    include: [{ model: UserRolesModel }]
                }
            ]
        })
        return properties;
    } catch (e) {
        throw e
    }


}

const getUserPropertiesV2 = async (userId, page, ALimit) => {

    try {
        const limit = ALimit ? ALimit : 3
        const offset = (page - 1) * limit;
        const { count, rows } = await PropertyModel.findAndCountAll({
            distinct: true,
            limit: limit,
            offset: offset,
            where: {
                user_id: userId
            },
            attributes: ["id", "price", "price_on_demand", "bedroom_count", "bathroom_count", "hall_count", "kitchen_count", "balcony_count", "built_up_area", "address", "landmark", "area", "pincode", "city", "state", "createdAt"],
            include: [
                {
                    model: PropertyPhotos,
                    include: [
                        {
                            model: PhotoCategoryModel,
                            attributes: ["name", "id"]

                        }

                    ]
                },
                {
                    model: UserModel,
                    attributes: ["agency_name", "company_name"],
                    include: [{ model: UserRolesModel }]
                }
            ]
        })
        return {
            data: rows,
            meta: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        }
    } catch (e) {
        throw e
    }


}

const deleteProperty = async (propertyId, userId) => {

    try {
        const idUserValid = await PropertyModel.findOne({
            where: {
                id: propertyId,
                user_id: userId
            }
        })

        if (!idUserValid) {
            return false
        }


        const property = await PropertyModel.destroy({
            where: {
                id: propertyId
            },
        })
        const propertyAmenities = await PropertyAmenities.destroy({
            where: {
                properties_id: propertyId
            },
        })
        const propertyPhotos = await PropertyPhotos.destroy({
            where: {
                properties_id: propertyId
            },
        })
        const interestedPeople = await InterestedPeoplesModel.destroy({
            where: {
                properties_id: propertyId
            },
        })
        const savedProperty = await SavePropertyModel.destroy({
            where: {
                property_id: propertyId
            },
        })

        return true


    } catch (e) {
        throw e;
    }


}

const getPropertiesSearchResult = async (swlat, swlong, nelat, nelong, filters, page, view, userId, limitA) => {

    try {

        const includesArray = [
            {
                model: PropertyPhotos,
                include: [
                    {
                        model: PhotoCategoryModel,
                        attributes: ["name", "id"]

                    }

                ]
            },
            {
                model: UserModel,
                ...(filters.userRoleId ?
                    {
                        where: {
                            user_roles_id: {
                                [Op.in]: filters.userRoleId
                            }
                        }
                    } : {}),
                attributes: ["agency_name", "company_name", "user_roles_id"],
                include: [
                    {
                        model: UserRolesModel,
                    },

                ],
            }
        ]

        if (userId) {
            includesArray.push({
                model: SavePropertyModel,
                where: { user_id: userId },
                required: false
            })
        }

        if (filters.sorting) {
            if (filters.sorting?.length >= 2) {
                if (filters.sorting[1] === "highToLow") {
                    filters.sorting[1] = "DESC"
                } else if (filters.sorting[1] === "lowToHigh") {
                    filters.sorting[1] = "ASC"
                }
            } else if (filters?.sorting[0] === "relevance") {
                filters.sorting = ["createdAt", "DESC"]
            } else if (filters?.sorting[0] === "newest") {
                filters.sorting = ["createdAt", "DESC"]
            }
        }

        const limit = limitA ? limitA : 3;
        const offset = (page - 1) * limit;


        //Days on app filter start
        const startDate = new Date();
        const endDate = new Date();
        if (filters.daysOnApp) {
            startDate.setDate(startDate.getDate() - filters.daysOnApp[1]);
            endDate.setDate(endDate.getDate() - filters.daysOnApp[0]);
        }
        //Days on app filter end

        const response = await PropertyModel.findAll({

            ...(view === "map" ? {
                include: [
                    {
                        model: UserModel,
                        attributes: ["id"],
                        ...(filters.userRoleId ?
                            {
                                where: {
                                    user_roles_id: {
                                        [Op.in]: filters.userRoleId
                                    }
                                }
                            } : {}),
                    }
                ]
            } :
                {
                    limit: limit,
                    offset: offset,
                    include: includesArray,
                    ...(filters.sorting ?
                        { order: [filters.sorting] } : {})
                }
            ),
            where: {
                latitude: {
                    [Op.between]: [swlat, nelat],
                },
                longitude: {
                    [Op.between]: [swlong, nelong],
                },
                //filter for home_types_id
                ...(filters.homeTypeId && filters.homeTypeId.length !== 0 ?
                    {
                        home_types_id: {
                            [Op.in]: filters.homeTypeId
                        }
                    } : {}),
                //filter for purpose_id
                ...(filters.purposeId ?
                    { purpose_id: filters.purposeId } : {}),
                //filter for price
                ...(filters.priceRange ?
                    { price: { [Op.between]: filters.priceRange } } : {}),
                //filter for bedroom_count
                ...(filters.bedroomCount ?
                    { bedroom_count: { [Op.in]: filters.bedroomCount } } : {}),
                //filter for bathroom_count
                ...(filters.bathroomCount ?
                    { bathroom_count: { [Op.in]: filters.bathroomCount } } : {}),
                //filter for hall_count
                ...(filters.hallCount ?
                    { hall_count: { [Op.in]: filters.hallCount } } : {}),
                //filter for kitchen_count
                ...(filters.kitchenCount ?
                    { kitchen_count: { [Op.in]: filters.kitchenCount } } : {}),
                //filter for balcony_count
                ...(filters.balconyCount ?
                    { balcony_count: { [Op.in]: filters.balconyCount } } : {}),
                //filter for built_up_area
                ...(filters.builtUpArea ?
                    { built_up_area: { [Op.between]: filters.builtUpArea } } : {}),
                //filter for maintenance
                ...(filters.maintenance ?
                    { maintenance: { [Op.between]: filters.maintenance } } : {}),
                //filter for property_age
                ...(filters.propertyAge ?
                    { property_age: { [Op.between]: filters.propertyAge } } : {}),
                //filter for createdAt for count days on app
                ...(filters.daysOnApp ?
                    {
                        createdAt: {
                            [Op.between]: [startDate, endDate]
                        }
                    } : {}),
                //filter for parking_slot_two_wheeler_count
                ...(filters.parkingSlotTwoWheelerCount ?
                    { parking_slot_two_wheeler_count: { [Op.in]: filters.parkingSlotTwoWheelerCount } } : {}),
                //filter for parking_slot_four_wheeler_count
                ...(filters.parkingSlotFourWheelerCount ?
                    { parking_slot_four_wheeler_count: { [Op.in]: filters.parkingSlotFourWheelerCount } } : {}),
                //filter for total_floor
                ...(filters.totalFloor ?
                    { total_floor: { [Op.between]: filters.totalFloor } } : {}),
                //filter for property_floor
                ...(filters.propertyFloor ?
                    { property_floor: { [Op.between]: filters.propertyFloor } } : {}),
                //filter for availability_types_id
                ...(filters.availabilityTypeId ?
                    { availability_types_id: { [Op.in]: filters.availabilityTypeId } } : {}),
                //filter for furnishings_id
                ...(filters.furnishingsId ?
                    { furnishings_id: { [Op.in]: filters.furnishingsId } } : {}),
                //filter for facing_id
                ...(filters.facingId ?
                    { facing_id: { [Op.in]: filters.facingId } } : {}),
                //filter for corner_property
                ...(filters.cornerProperty == 0 || filters.cornerProperty == 1 ?
                    { corner_property: filters.cornerProperty } : {}),
                //filter for verified_property
                ...(filters.verifiedProperty == 0 || filters.verifiedProperty == 1 ?
                    { verified_property: filters.verifiedProperty } : {}),
                //filter for agent_certification
                ...(filters.agentCertification == 0 || filters.agentCertification == 1 ?
                    { agent_certification: filters.agentCertification } : {}),
                //filter for possessions_id
                ...(filters.possessionsId ?
                    { possessions_id: { [Op.in]: filters.possessionsId } } : {}),
                //filter for possessions_id
                ...(filters.project_type_id ?
                    { project_type_id: { [Op.in]: filters.project_type_id } } : {}),
                //filter for tenants_id
                ...(filters.tenantsId ?
                    { tenants_id: { [Op.in]: filters.tenantsId } } : {}),
                //filter for tenants_id
                ...(filters.builder_id ?
                    { builder_id: { [Op.in]: filters.builder_id } } : {}),


            },
            attributes: view === "map" ? ["latitude", "longitude", "id", "price", "price_on_demand"] : ["latitude", "longitude", "id", "price", "price_on_demand", "bedroom_count", "bathroom_count", "hall_count", "kitchen_count", "balcony_count", "built_up_area", "address", "landmark", "area", "pincode", "city", "state", "createdAt"],

        })

        return response
    } catch (e) {
        throw e
    }

}

const getProperty = async (propertyId, view, userId) => {

    const includesFull = [
        {
            model: PropertyAmenities,
            include: [
                {
                    model: AmenityModel
                }
            ]
        },
        {
            model: PropertyPhotos,
            include: [
                {
                    model: PhotoCategoryModel,
                    attributes: ["name", "id"]

                }

            ]
        },
        {
            model: InterestedPeoplesModel,
            include: [
                {
                    model: UserModel,

                }

            ]
        },
        {
            model: PurposeModel,
        },
        {
            model: HomeTypeModel,
        },
        {
            model: FacingModel,
        },
        {
            model: FlooringTypeModel,
        },
        {
            model: OwnershipTypeModel,
        },
        {
            model: AvailabilityTypeModel,
        },
        {
            model: FurnishingsModel,
        },
        {
            model: KitchenTypesModel,
        },
        {
            model: WaterSuppliesModel,
        },
        {
            model: PowerBackupsModel,
        },
        {
            model: PossessionsModel,
        },
        {
            model: TenantsModel,
        },
        {
            model: AgentModel,
            attributes: ["name", "id", "avatar"],
        },
        {
            model: BuilderModel,
            attributes: ["name", "id", "avatar"],
        }

    ]

    if (userId) {
        includesFull.push({
            model: SavePropertyModel,
            where: { user_id: userId },
            required: false
        })
    }

    try {
        const property = await PropertyModel.findOne({
            where: {
                id: propertyId,
            },
            attributes: view === "card" ? ['price_on_demand', 'address', 'bedroom_count', 'bathroom_count', 'hall_count', 'kitchen_count', 'balcony_count', 'built_up_area', 'price', 'createdAt', "id"] : { exclude: [] },
            include: view === "card"
                ?
                [{
                    model: PropertyPhotos,
                    include: [
                        {
                            model: PhotoCategoryModel,
                            attributes: ["name", "id"]

                        }

                    ],
                    attributes: { exclude: ['createdAt', 'updatedAt'] }

                },
                {
                    model: UserModel,
                    attributes: ["user_roles_id", "id"],
                    include: [
                        {
                            model: UserRolesModel
                        }
                    ]
                }
                ]
                : includesFull,

        })

        return property;
    } catch (e) {
        throw e;
    }

}
const getPropertyV2 = async (propertyId, view, userId) => {

    const includesFull = [
        {
            model: PropertyAmenities,
            include: [
                {
                    model: AmenityModel
                }
            ]
        },
        {
            model: PropertyPhotos,
            include: [
                {
                    model: PhotoCategoryModel,
                    attributes: ["name", "id"]

                }

            ]
        },
        {
            model: InterestedPeoplesModel,
            include: [
                {
                    model: UserModel,

                }

            ]
        },
        {
            model: PurposeModel,
        },
        {
            model: HomeTypeModel,
        },
        {
            model: FacingModel,
        },
        {
            model: FlooringTypeModel,
        },
        {
            model: OwnershipTypeModel,
        },
        {
            model: AvailabilityTypeModel,
        },
        {
            model: FurnishingsModel,
        },
        {
            model: KitchenTypesModel,
        },
        {
            model: WaterSuppliesModel,
        },
        {
            model: PowerBackupsModel,
        },
        {
            model: PossessionsModel,
        },
        {
            model: TenantsModel,
        },
        {
            model: AgentModel,
            attributes: ["name", "id", "avatar"],
        },
        {
            model: BuilderModel,
            attributes: ["name", "id", "avatar"],
        }

    ]

    const includesCard = [
        {
            model: PropertyPhotos,
            include: [
                {
                    model: PhotoCategoryModel,
                    attributes: ["name", "id"]

                }

            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }

        },
        {
            model: UserModel,
            attributes: ["user_roles_id", "id"],
            include: [
                {
                    model: UserRolesModel
                }
            ]
        }
    ]

    // if (userId) {
    //     includesFull.push({
    //         model: SavePropertyModel,
    //         where: { user_id: userId },
    //         required: false
    //     })
    // }

    if (userId) {
        const savePropertyInclude = {
            model: SavePropertyModel,
            where: { user_id: userId },
            required: false, // Ensures properties are not filtered out
            attributes: ["id"] // Fetch only necessary fields
        };

        includesFull.push(savePropertyInclude);
        includesCard.push(savePropertyInclude);
    }

    try {
        const property = await PropertyModel.findOne({
            where: {
                id: propertyId,
            },
            attributes: view === "card" ? ['price_on_demand', 'address', 'bedroom_count', 'bathroom_count', 'hall_count', 'kitchen_count', 'balcony_count', 'built_up_area', 'price', 'createdAt', "id"] : { exclude: [] },
            include: view === "card" ? includesCard : includesFull,

        })
        // Add isSaved flag
        const propertyJSON = property.toJSON();
        propertyJSON.isSaved = propertyJSON?.saved_properties && propertyJSON?.saved_properties.length > 0;


        return propertyJSON;
    } catch (e) {
        throw e;
    }

}

const getPropertiesById = async (ids) => {
    try {
        const response = await PropertyModel.findAll({
            where: {
                id: ids
            },
            include: [
                {
                    model: PropertyAmenities,
                    include: [
                        {
                            model: AmenityModel
                        }
                    ]
                },
                {
                    model: PropertyPhotos,
                    include: [
                        {
                            model: PhotoCategoryModel,
                            attributes: ["name", "id"]

                        }

                    ]
                },
                {
                    model: InterestedPeoplesModel,
                    include: [{ model: UserModel }]
                },
                {
                    model: PurposeModel,
                },
                {
                    model: HomeTypeModel,
                },
                {
                    model: FacingModel,
                },
                {
                    model: FlooringTypeModel,
                },
                {
                    model: OwnershipTypeModel,
                },
                {
                    model: AvailabilityTypeModel,
                },
                {
                    model: FurnishingsModel,
                },
                {
                    model: KitchenTypesModel,
                },
                {
                    model: WaterSuppliesModel,
                },
                {
                    model: PowerBackupsModel,
                },
                {
                    model: PossessionsModel,
                },
                {
                    model: TenantsModel,
                },
                {
                    model: UserModel
                },
                {
                    model: SavePropertyModel
                },
            ],
        })

        return response
    } catch (e) {
        throw e;
    }
}

const getPropertyWhere = async (where) => {
    try {
        const result = await PropertyModel.findOne({
            where
        })

        return result;
    } catch (e) {
        throw e;
    }
}


const update = async (data, condition) => {
    try {
        const response = await PropertyModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await PropertyModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findOne = async (condition) => {
    try {
        const response = await PropertyModel.findOne(condition)
        return response
    } catch (e) {
        throw e;
    }
}

const getPropertiesSearchResultV2 = async (swlat, swlong, nelat, nelong, filters, page, view, userId, limitA) => {

    try {

        const includesArray = [
            {
                model: PropertyPhotos,
                include: [
                    {
                        model: PhotoCategoryModel,
                        attributes: ["name", "id"]

                    }

                ]
            },
            {
                model: UserModel,
                ...(filters.userRoleId ?
                    {
                        where: {
                            user_roles_id: {
                                [Op.in]: filters.userRoleId
                            }
                        }
                    } : {}),
                attributes: ["agency_name", "company_name", "user_roles_id"],
                include: [
                    {
                        model: UserRolesModel,
                    },

                ],
            }
        ]

        // if (userId) {
        //     includesArray.push({
        //         model: SavePropertyModel,
        //         where: { user_id: userId },
        //         required: false
        //     })
        // }

        if (userId) {
            includesArray.push({
                model: SavePropertyModel,
                required: false, // Do not filter properties, just check if they exist
                where: { user_id: userId },
                attributes: ["id"], // Fetch only the necessary field
            });
        }

        if (filters.sorting) {
            if (filters.sorting?.length >= 2) {
                if (filters.sorting[1] === "highToLow") {
                    filters.sorting[1] = "DESC"
                } else if (filters.sorting[1] === "lowToHigh") {
                    filters.sorting[1] = "ASC"
                }
            } else if (filters?.sorting[0] === "relevance") {
                filters.sorting = ["createdAt", "DESC"]
            } else if (filters?.sorting[0] === "newest") {
                filters.sorting = ["createdAt", "DESC"]
            }
        }

        const limit = limitA ? limitA : 3;
        const offset = (page - 1) * limit;


        //Days on app filter start
        const startDate = new Date();
        const endDate = new Date();
        if (filters.daysOnApp) {
            startDate.setDate(startDate.getDate() - filters.daysOnApp[1]);
            endDate.setDate(endDate.getDate() - filters.daysOnApp[0]);
        }
        //Days on app filter end

        const { count, rows } = await PropertyModel.findAndCountAll({
            distinct: true,
            ...(view === "map" ?
                {
                    include: [
                        {
                            model: UserModel,
                            attributes: ["id"],
                            ...(filters.userRoleId ?
                                {
                                    where: {
                                        user_roles_id: {
                                            [Op.in]: filters.userRoleId
                                        }
                                    }
                                } : {}),
                        }
                    ]
                } :
                {
                    limit: limit,
                    offset: offset,
                    include: includesArray,
                    ...(filters.sorting ?
                        { order: [filters.sorting] } : {})
                }
            ),
            where: {
                latitude: {
                    [Op.between]: [swlat, nelat],
                },
                longitude: {
                    [Op.between]: [swlong, nelong],
                },
                //filter for home_types_id
                ...(filters.homeTypeId && filters.homeTypeId.length !== 0 ?
                    {
                        home_types_id: {
                            [Op.in]: filters.homeTypeId
                        }
                    } : {}),
                //filter for purpose_id
                ...(filters.purposeId ?
                    { purpose_id: filters.purposeId } : {}),
                //filter for price
                ...(filters.priceRange ?
                    { price: { [Op.between]: filters.priceRange } } : {}),
                //filter for bedroom_count
                ...(filters.bedroomCount ?
                    { bedroom_count: { [Op.in]: filters.bedroomCount } } : {}),
                //filter for bathroom_count
                ...(filters.bathroomCount ?
                    { bathroom_count: { [Op.in]: filters.bathroomCount } } : {}),
                //filter for hall_count
                ...(filters.hallCount ?
                    { hall_count: { [Op.in]: filters.hallCount } } : {}),
                //filter for kitchen_count
                ...(filters.kitchenCount ?
                    { kitchen_count: { [Op.in]: filters.kitchenCount } } : {}),
                //filter for balcony_count
                ...(filters.balconyCount ?
                    { balcony_count: { [Op.in]: filters.balconyCount } } : {}),
                //filter for built_up_area
                ...(filters.builtUpArea ?
                    { built_up_area: { [Op.between]: filters.builtUpArea } } : {}),
                //filter for maintenance
                ...(filters.maintenance ?
                    { maintenance: { [Op.between]: filters.maintenance } } : {}),
                //filter for property_age
                ...(filters.propertyAge ?
                    { property_age: { [Op.between]: filters.propertyAge } } : {}),
                //filter for createdAt for count days on app
                ...(filters.daysOnApp ?
                    {
                        createdAt: {
                            [Op.between]: [startDate, endDate]
                        }
                    } : {}),
                //filter for parking_slot_two_wheeler_count
                ...(filters.parkingSlotTwoWheelerCount ?
                    { parking_slot_two_wheeler_count: { [Op.in]: filters.parkingSlotTwoWheelerCount } } : {}),
                //filter for parking_slot_four_wheeler_count
                ...(filters.parkingSlotFourWheelerCount ?
                    { parking_slot_four_wheeler_count: { [Op.in]: filters.parkingSlotFourWheelerCount } } : {}),
                //filter for total_floor
                ...(filters.totalFloor ?
                    { total_floor: { [Op.between]: filters.totalFloor } } : {}),
                //filter for property_floor
                ...(filters.propertyFloor ?
                    { property_floor: { [Op.between]: filters.propertyFloor } } : {}),
                //filter for availability_types_id
                ...(filters.availabilityTypeId ?
                    { availability_types_id: { [Op.in]: filters.availabilityTypeId } } : {}),
                //filter for furnishings_id
                ...(filters.furnishingsId ?
                    { furnishings_id: { [Op.in]: filters.furnishingsId } } : {}),
                //filter for facing_id
                ...(filters.facingId ?
                    { facing_id: { [Op.in]: filters.facingId } } : {}),
                //filter for corner_property
                ...(filters.cornerProperty == 0 || filters.cornerProperty == 1 ?
                    { corner_property: filters.cornerProperty } : {}),
                //filter for verified_property
                ...(filters.verifiedProperty == 0 || filters.verifiedProperty == 1 ?
                    { verified_property: filters.verifiedProperty } : {}),
                //filter for agent_certification
                ...(filters.agentCertification == 0 || filters.agentCertification == 1 ?
                    { agent_certification: filters.agentCertification } : {}),
                //filter for possessions_id
                ...(filters.possessionsId ?
                    { possessions_id: { [Op.in]: filters.possessionsId } } : {}),
                //filter for possessions_id
                ...(filters.project_type_id ?
                    { project_type_id: { [Op.in]: filters.project_type_id } } : {}),
                //filter for tenants_id
                ...(filters.tenantsId ?
                    { tenants_id: { [Op.in]: filters.tenantsId } } : {}),
                //filter for tenants_id
                ...(filters.builder_id ?
                    { builder_id: { [Op.in]: filters.builder_id } } : {}),


            },
            attributes: view === "map" ? ["latitude", "longitude", "id", "price", "price_on_demand"] : ["latitude", "longitude", "id", "price", "price_on_demand", "bedroom_count", "bathroom_count", "hall_count", "kitchen_count", "balcony_count", "built_up_area", "address", "landmark", "area", "pincode", "city", "state", "createdAt"],

        })

        const formattedData = rows.map(property => ({
            ...property.toJSON(),
            isSaved: property?.saved_properties && property?.saved_properties?.length > 0, // Check if property is saved
        }));


        return {
            data: formattedData,
            meta: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit),
            }
        }
    } catch (e) {
        throw e
    }

}

const findAndCountAll = async ({ page, limit }) => {
    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await PropertyModel.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        return {
            data: rows,
            meta: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit),
            }
        }

    } catch (error) {
        throw e;
    }
}

module.exports = {
    createProperty, getUserProperties, deleteProperty,
    getPropertiesSearchResult, getProperty, getPropertiesById,
    getPropertyWhere, findAll, update, findOne, findAndCountAll, getPropertiesSearchResultV2,
    getPropertyV2, getUserPropertiesV2
}
