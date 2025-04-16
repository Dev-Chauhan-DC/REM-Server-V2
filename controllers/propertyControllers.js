const propertyServices = require("../services/propertyServices");
const responseUtilities = require('../utilities/responseUtilities');
const { s3ReadUrl } = require("../utilities/s3");
const { isNumber } = require("../utilities/validator");
const responses = new responseUtilities()
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')


const createProperty = async (req, res) => {
    try {
        const data = {

            userId: parseInt(req.userId),
            purposeId: parseInt(req.body.purposeId),
            homeTypeId: parseInt(req.body.homeTypeId),
            address: req.body.address,
            landmark: req.body.landmark,
            area: req.body.area,
            pincode: req.body.pincode,
            city: req.body.city,
            state: req.body.state,
            bedroomCount: parseInt(req.body.bedroomCount) || 0,
            bathroomCount: parseInt(req.body.bathroomCount) || 0,
            hallCount: parseInt(req.body.hallCount) || 0,
            kitchenCount: parseInt(req.body.kitchenCount) || 0,
            balconyCount: parseInt(req.body.balconyCount) || 0,
            builtUpArea: parseFloat(req.body.builtUpArea) || 0,
            carpetArea: parseFloat(req.body.carpetArea) || 0,
            plotArea: req.body.plotArea ? parseFloat(req.body.plotArea) : 0,
            facingId: parseInt(req.body.facingId) || 0,
            lookingForId: parseInt(req.body.lookingForId) || 0,
            occupancyId: parseInt(req.body.occupancyId) || 0,
            propertyAge: parseFloat(req.body.propertyAge) || 0,
            totalFloor: parseFloat(req.body.totalFloor) || 0,
            propertyFloor: parseFloat(req.body.propertyFloor) || 0,
            flooringTypeId: parseInt(req.body.flooringTypeId) || 0,
            ownershipTypeId: parseInt(req.body.ownershipTypeId) || 0,
            latitude: parseFloat(req.body.latitude),
            longitude: parseFloat(req.body.longitude),
            price: parseFloat(req.body.price) || 0,
            negotiable: parseInt(req.body.negotiable) || 0,
            maintenance: parseFloat(req.body.maintenance) || 0,
            currentlyUnderLoan: parseInt(req.body.currentlyUnderLoan) || 0,
            availabilityTypeId: parseInt(req.body.availabilityTypeId) || 0,
            furnishingsId: parseInt(req.body.furnishingsId) || 0,
            parkingSlotTwoWheelerCount: parseInt(req.body.parkingSlotTwoWheelerCount) || 0,
            parkingSlotFourWheelerCount: parseInt(req.body.parkingSlotFourWheelerCount) || 0,
            cupboard: parseInt(req.body.cupboard) || 0,
            kitchenTypesId: parseInt(req.body.kitchenTypesId) || 0,
            propertyDescription: req.body.propertyDescription,
            descriptionRoomie: req.body.descriptionRoomie,
            gatedSecurity: parseInt(req.body.gatedSecurity),
            gym: parseInt(req.body.gym) || 0,
            waterSuppliesId: parseInt(req.body.waterSuppliesId) || 0,
            powerBackupsId: parseInt(req.body.powerBackupsId) || 0,
            cornerProperty: parseInt(req.body.cornerProperty) || 0,
            verifiedProperty: parseInt(req.body.verifiedProperty) || 0,
            agentCertification: parseInt(req.body.agentCertification) || 0,
            possessionsId: parseInt(req.body.possessionsId) || 0,
            flatsInBuilding: parseInt(req.body.flatsInBuilding) || 0,
            deposit: parseFloat(req.body.deposit) || 0,
            tenantsId: parseInt(req.body.tenantsId) || 0,
        }
        const property = await propertyServices.createProperty(data)

        return res.status(200).send(responses.ok200("Property created successfully", property))

    } catch (error) {
        console.error(error)
        res.status(500).send(responses.internalServerError500())
    }
}

const getUserProperties = async (req, res) => {
    try {
        const userId = req.userId
        //pagination page
        const page = req.query.page && isNumber(req.query.page) ? parseInt(req.query.page) : 1;
        const limit = req?.query?.limit ? parseInt(req.query.limit) : null;

        const response = await propertyServices.getUserProperties(userId, page, limit);

        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < response[i].property_photos.length; j++) {
                const fileId = response[i].property_photos[j].file_id;

                if (fileId && isNumber(fileId)) {
                    const propertyImageUrl = await s3ReadUrl(fileId)
                    if (propertyImageUrl) {
                        response[i].property_photos[j].photos = propertyImageUrl
                    }
                }


            }
        }


        return res.status(200).send(responses.ok200("", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}
const getUserPropertiesV2 = async (req, res) => {
    try {
        const userId = req.userId
        //pagination page
        const page = req.query.page && isNumber(req.query.page) ? parseInt(req.query.page) : 1;
        const limit = req?.query?.limit ? parseInt(req.query.limit) : null;

        const response = await propertyServices.getUserPropertiesV2(userId, page, limit);

        for (let i = 0; i < response.data.length; i++) {
            for (let j = 0; j < response.data[i].property_photos.length; j++) {
                const fileId = response.data[i].property_photos[j].file_id;

                if (fileId && isNumber(fileId)) {
                    const propertyImageUrl = await s3ReadUrl(fileId)
                    if (propertyImageUrl) {
                        response.data[i].property_photos[j].photos = propertyImageUrl
                    }
                }


            }
        }


        return res.status(200).send(ok200("", response.data, response.meta))
    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}

const deleteProperty = async (req, res) => {
    try {
        const propertyId = parseInt(req.params.property_id)
        const userId = parseInt(req.userId)

        const isUserOwnTheProp = await propertyServices.getPropertyWhere({
            id: propertyId,
            user_id: userId
        })

        if (!isUserOwnTheProp) {
            return res.status(400).send(responses.badRequest400("You have not posted the property"))
        }

        const response = await propertyServices.deleteProperty(propertyId, userId)

        return res.status(200).send(responses.ok200("", response))

    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}

const getPropertiesSearchResult = async (req, res) => {
    try {
        const userId = parseInt(req.userId)
        const purposeId = req.query.purposeId ? parseInt(req.query.purposeId) : undefined
        // const homeTypeId = req.query.homeTypeId ? (req.query.homeTypeId).split(",").map(i => i && parseInt(i)) : undefined
        const homeTypeId = req.query.homeTypeId
            ? (req.query.homeTypeId)
                .split(",")
                .filter(i => /^\d+$/.test(i)) // Keep only pure numeric values
                .map(Number) // Convert to integers
            : undefined;
        const userRoleId = req.query.userRoleId ? (req.query.userRoleId).split(",").map(Number) : undefined
        const priceRange = req.query.priceRange ? (req.query.priceRange).split("-").map(Number) : undefined


        const bedroomCount = req.query.bedroomCount ? (req.query.bedroomCount).split(",").map(Number) : undefined
        const bathroomCount = req.query.bathroomCount ? (req.query.bathroomCount).split(",").map(Number) : undefined
        const hallCount = req.query.hallCount ? (req.query.hallCount).split(",").map(Number) : undefined
        const kitchenCount = req.query.kitchenCount ? (req.query.kitchenCount).split(",").map(Number) : undefined
        const balconyCount = req.query.balconyCount ? (req.query.balconyCount).split(",").map(Number) : undefined


        const builtUpArea = req.query.builtUpArea ? (req.query.builtUpArea).split("-").map(Number) : undefined
        const maintenance = req.query.maintenance ? (req.query.maintenance).split("-").map(Number) : undefined
        const propertyAge = req.query.propertyAge ? (req.query.propertyAge).split("-").map(Number) : undefined
        const daysOnApp = req.query.daysOnApp ? (req.query.daysOnApp).split("-").map(Number) : undefined

        const parkingSlotTwoWheelerCount = req.query.parkingSlotTwoWheelerCount ? (req.query.parkingSlotTwoWheelerCount).split(",").map(Number) : undefined
        const parkingSlotFourWheelerCount = req.query.parkingSlotFourWheelerCount ? (req.query.parkingSlotFourWheelerCount).split(",").map(Number) : undefined


        const totalFloor = req.query.totalFloor ? (req.query.totalFloor).split("-").map(Number) : undefined
        const propertyFloor = req.query.propertyFloor ? (req.query.propertyFloor).split("-").map(Number) : undefined
        const availabilityTypeId = req.query.availabilityTypeId ? (req.query.availabilityTypeId).split(",").map(Number) : undefined
        const furnishingsId = req.query.furnishingsId ? (req.query.furnishingsId).split(",").map(Number) : undefined
        const facingId = req.query.facingId ? (req.query.facingId).split(",").map(Number) : undefined
        const cornerProperty = req.query.cornerProperty ? parseInt(req.query.cornerProperty) : undefined
        const verifiedProperty = req.query.verifiedProperty ? parseInt(req.query.verifiedProperty) : undefined
        const agentCertification = req.query.agentCertification ? parseInt(req.query.agentCertification) : undefined
        // const possessionsId = req.query.possessionsId ? parseInt(req.query.possessionsId) : undefined
        const possessionsId = req.query.possessionsId ? (req.query.possessionsId).split(",").map(Number) : undefined
        const project_type_id = req.query.project_type_id ? (req.query.project_type_id).split(",").map(Number) : undefined
        const tenantsId = req.query.tenantsId ? (req.query.tenantsId).split(",").map(Number) : undefined
        const builder_id = req.query.builder_id ? (req.query.builder_id).split(",").map(Number) : undefined


        const sorting = req.query.sorting ? req.query.sorting.split("-") : undefined

        //pagination page
        const page = req.query.page && isNumber(req.query.page) ? parseInt(req.query.page) : 1;

        //map view
        const view = req?.query?.view || undefined




        const filters = {
            purposeId,
            homeTypeId,
            userRoleId,
            priceRange,
            bedroomCount,
            bathroomCount,
            hallCount,
            kitchenCount,
            balconyCount,
            builtUpArea,
            maintenance,
            propertyAge,
            daysOnApp,
            parkingSlotTwoWheelerCount,
            parkingSlotFourWheelerCount,
            totalFloor,
            propertyFloor,
            availabilityTypeId,
            furnishingsId,
            facingId,
            cornerProperty,
            verifiedProperty,
            agentCertification,
            possessionsId,
            project_type_id,
            tenantsId,
            builder_id,
            sorting

        }


        const swlat = parseFloat(req.params.swlat)
        const swlong = parseFloat(req.params.swlong)
        const nelat = parseFloat(req.params.nelat)
        const nelong = parseFloat(req.params.nelong)


        const limit = req?.query?.limit ? parseInt(req?.query?.limit) : undefined;

        const response = await propertyServices.getPropertiesSearchResult(swlat, swlong, nelat, nelong, filters, page, view, userId, limit)


        //Property Photos
        if (view !== "map") {
            for (let i = 0; i < response.length; i++) {
                for (let j = 0; j < response[i].property_photos.length; j++) {
                    const fileId = response[i].property_photos[j].file_id;

                    if (fileId && isNumber(fileId)) {
                        const propertyImageUrl = await s3ReadUrl(fileId)
                        if (propertyImageUrl) {
                            response[i].property_photos[j].photos = propertyImageUrl
                        }
                    }

                }
            }
        }



        if (response) {
            return res.status(200).send({
                message: "successful",
                status: true,
                data: response,
                currentUserId: userId ? userId : null
            })
        }

    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}

const getPropertiesSearchResultV2 = async (req, res) => {
    try {
        const userId = parseInt(req.userId)
        const purposeId = req.query.purposeId ? parseInt(req.query.purposeId) : undefined
        // const homeTypeId = req.query.homeTypeId ? (req.query.homeTypeId).split(",").map(i => i && parseInt(i)) : undefined
        const homeTypeId = req.query.homeTypeId
            ? (req.query.homeTypeId)
                .split(",")
                .filter(i => /^\d+$/.test(i)) // Keep only pure numeric values
                .map(Number) // Convert to integers
            : undefined;
        const userRoleId = req.query.userRoleId ? (req.query.userRoleId).split(",").map(Number) : undefined
        const priceRange = req.query.priceRange ? (req.query.priceRange).split("-").map(Number) : undefined


        const bedroomCount = req.query.bedroomCount ? (req.query.bedroomCount).split(",").map(Number) : undefined
        const bathroomCount = req.query.bathroomCount ? (req.query.bathroomCount).split(",").map(Number) : undefined
        const hallCount = req.query.hallCount ? (req.query.hallCount).split(",").map(Number) : undefined
        const kitchenCount = req.query.kitchenCount ? (req.query.kitchenCount).split(",").map(Number) : undefined
        const balconyCount = req.query.balconyCount ? (req.query.balconyCount).split(",").map(Number) : undefined


        const builtUpArea = req.query.builtUpArea ? (req.query.builtUpArea).split("-").map(Number) : undefined
        const maintenance = req.query.maintenance ? (req.query.maintenance).split("-").map(Number) : undefined
        const propertyAge = req.query.propertyAge ? (req.query.propertyAge).split("-").map(Number) : undefined
        const daysOnApp = req.query.daysOnApp ? (req.query.daysOnApp).split("-").map(Number) : undefined

        const parkingSlotTwoWheelerCount = req.query.parkingSlotTwoWheelerCount ? (req.query.parkingSlotTwoWheelerCount).split(",").map(Number) : undefined
        const parkingSlotFourWheelerCount = req.query.parkingSlotFourWheelerCount ? (req.query.parkingSlotFourWheelerCount).split(",").map(Number) : undefined


        const totalFloor = req.query.totalFloor ? (req.query.totalFloor).split("-").map(Number) : undefined
        const propertyFloor = req.query.propertyFloor ? (req.query.propertyFloor).split("-").map(Number) : undefined
        const availabilityTypeId = req.query.availabilityTypeId ? (req.query.availabilityTypeId).split(",").map(Number) : undefined
        const furnishingsId = req.query.furnishingsId ? (req.query.furnishingsId).split(",").map(Number) : undefined
        const facingId = req.query.facingId ? (req.query.facingId).split(",").map(Number) : undefined
        const cornerProperty = req.query.cornerProperty ? parseInt(req.query.cornerProperty) : undefined
        const verifiedProperty = req.query.verifiedProperty ? parseInt(req.query.verifiedProperty) : undefined
        const agentCertification = req.query.agentCertification ? parseInt(req.query.agentCertification) : undefined
        // const possessionsId = req.query.possessionsId ? parseInt(req.query.possessionsId) : undefined
        const possessionsId = req.query.possessionsId ? (req.query.possessionsId).split(",").map(Number) : undefined
        const project_type_id = req.query.project_type_id ? (req.query.project_type_id).split(",").map(Number) : undefined
        const tenantsId = req.query.tenantsId ? (req.query.tenantsId).split(",").map(Number) : undefined
        const builder_id = req.query.builder_id ? (req.query.builder_id).split(",").map(Number) : undefined


        const sorting = req.query.sorting ? req.query.sorting.split("-") : undefined

        //pagination page
        const page = req.query.page && isNumber(req.query.page) ? parseInt(req.query.page) : 1;

        //map view
        const view = req?.query?.view || undefined




        const filters = {
            purposeId,
            homeTypeId,
            userRoleId,
            priceRange,
            bedroomCount,
            bathroomCount,
            hallCount,
            kitchenCount,
            balconyCount,
            builtUpArea,
            maintenance,
            propertyAge,
            daysOnApp,
            parkingSlotTwoWheelerCount,
            parkingSlotFourWheelerCount,
            totalFloor,
            propertyFloor,
            availabilityTypeId,
            furnishingsId,
            facingId,
            cornerProperty,
            verifiedProperty,
            agentCertification,
            possessionsId,
            project_type_id,
            tenantsId,
            builder_id,
            sorting

        }


        const swlat = parseFloat(req.params.swlat)
        const swlong = parseFloat(req.params.swlong)
        const nelat = parseFloat(req.params.nelat)
        const nelong = parseFloat(req.params.nelong)


        const limit = req?.query?.limit ? parseInt(req?.query?.limit) : undefined;

        const response = await propertyServices.getPropertiesSearchResultV2(swlat, swlong, nelat, nelong, filters, page, view, userId, limit)


        //Property Photos
        if (view !== "map") {
            for (let i = 0; i < response.data.length; i++) {
                for (let j = 0; j < response.data[i].property_photos.length; j++) {
                    const fileId = response.data[i].property_photos[j].file_id;

                    if (fileId && isNumber(fileId)) {
                        const propertyImageUrl = await s3ReadUrl(fileId)
                        if (propertyImageUrl) {
                            response.data[i].property_photos[j].photos = propertyImageUrl
                        }
                    }

                }
            }
        }



        // if (response.data) {
        //     return res.status(200).send({
        //         message: "successful",
        //         status: true,
        //         data: response.data,
        //         // currentUserId: userId ? userId : null,
        //         meta: response.meta
        //     })
        // }

        if (response.data) {
            return res.status(200).send(ok200(
                "sent successfully",
                response.data,
                response.meta
            ))
        }

    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}

const getProperty = async (req, res) => {
    try {
        const userId = parseInt(req.userId)
        const propertyId = parseInt(req.body.propertyId);

        const view = req?.query?.view || undefined;

        const property = await propertyServices.getPropertyV2(propertyId, view, userId);


        for (let j = 0; j < property.property_photos.length; j++) {
            const fileId = property.property_photos[j].file_id;

            if (fileId && isNumber(fileId)) {
                const propertyImageUrl = await s3ReadUrl(fileId)
                if (propertyImageUrl) {
                    property.property_photos[j].photos = propertyImageUrl
                }
            }


        }

        if (property?.builder?.avatar) {
            const BuilderAvatarUrl = await s3ReadUrl(property.builder.avatar)
            property.builder.avatar = BuilderAvatarUrl
        }
        if (property?.agent_profile?.avatar) {
            const AgentAvatarUrl = await s3ReadUrl(property.agent_profile.avatar)
            property.agent_profile.avatar = AgentAvatarUrl
        }






        return res.status(200).send(responses.ok200("", property))

    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}

const getPropertyV2 = async (req, res) => {
    try {
        const userId = parseInt(req.userId)
        const propertyId = parseInt(req.params.id);

        const view = req?.query?.view || undefined;

        const property = await propertyServices.getPropertyV2(propertyId, view, userId);


        for (let j = 0; j < property.property_photos.length; j++) {
            const fileId = property.property_photos[j].file_id;

            if (fileId && isNumber(fileId)) {
                const propertyImageUrl = await s3ReadUrl(fileId)
                if (propertyImageUrl) {
                    property.property_photos[j].photos = propertyImageUrl
                }
            }


        }

        if (property?.builder?.avatar) {
            const BuilderAvatarUrl = await s3ReadUrl(property.builder.avatar)
            property.builder.avatar = BuilderAvatarUrl
        }
        if (property?.agent_profile?.avatar) {
            const AgentAvatarUrl = await s3ReadUrl(property.agent_profile.avatar)
            property.agent_profile.avatar = AgentAvatarUrl
        }






        return res.status(200).send(responses.ok200("", property))

    } catch (e) {
        console.error(e)
        return res.status(500).send(responses.internalServerError500())
    }
}

const getProperties = async (req, res) => {
    try {

        const { ids } = req.query
        const idArray = ids.split(',');
        const numericArray = idArray.map(Number);

        const response = await propertyServices.getPropertiesById(numericArray)



        if (!response) {
            return res.status(404).send(responses.notFound404("", null))
        }

        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < response[i].property_photos.length; j++) {
                const fileId = response[i].property_photos[j].file_id;

                if (fileId && isNumber(fileId)) {
                    const propertyImageUrl = await s3ReadUrl(fileId)
                    if (propertyImageUrl) {
                        response[i].property_photos[j].photos = propertyImageUrl
                    }
                }


            }
        }


        return res.status(200).send(responses.ok200("", response))
    } catch (error) {
        console.error(error)
        return res.status(500).send(responses.internalServerError500())
    }
}

const update = async (req, res) => {
    try {

        const user_id = parseInt(req.user.id)
        const id = parseInt(req.params.id)
        const data = req.body

        const userProperties = await propertyServices.findAll({ where: { user_id } })


        if (!(userProperties.some(property => property.id === id))) {
            return res.status(400).send(badRequest400("Property Not Found", null))
        }

        const keysToDelete = ['user_id', 'createdAt', 'updatedAt', 'id'];
        keysToDelete.forEach(key => delete data[key]);


        const result = await propertyServices.update(data, {
            where: { id }
        })

        return res.status(200).send(ok200("updated successfully", result))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const listings = async (req, res) => {
    try {

        const result = await propertyServices.findAndCountAll({ page: 1, limit: 10 })

        return res.status(200).send(ok200("sent successfully", result.data, result.meta))
    } catch (error) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}


module.exports = {
    createProperty, getUserProperties, deleteProperty,
    getPropertiesSearchResult, getProperty, getProperties,
    update, listings, getPropertiesSearchResultV2, getPropertyV2, getUserPropertiesV2
}
