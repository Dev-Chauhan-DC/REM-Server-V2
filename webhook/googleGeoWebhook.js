const { ok200, badRequest400, internalServerError500 } = require('../utilities/responseUtility')
const axios = require('axios')

const getPlace = async (req, res) => {
    try {
        const { input, types, fields } = req.query;

        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input,
                key: process.env.GOOGLE_MAP_API,
                types,
                fields,
            },
        });

        return res.status(200).send(ok200("Suggestion sent successfully", response.data))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())

    }
}


const getPlaceDetails = async (req, res) => {
    try {
        const { placeId } = req.query;

        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
            params: {
                key: process.env.GOOGLE_MAP_API,
                placeid: placeId
            }
        })

        return res.status(200).send(ok200("Location sent successfully", response.data))
    } catch (error) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}


const autocomplete = async (params) => {
    try {

        const result = await axios.get(process.env.GOOGLE_MAPS_URL + '/maps/api/place/autocomplete/json', {
            params: {
                key: process.env.GOOGLE_MAP_API,
                components: 'country:in',
                ...params
            },
        });

        return result.data
    } catch (e) {
        throw e
    }
}

const place = async (params) => {
    try {
        const result = await axios.get(process.env.GOOGLE_MAPS_URL + `/maps/api/place/details/json`, {
            params: {
                key: process.env.GOOGLE_MAP_API,
                ...params
            }
        })

        return result.data;
    } catch (error) {
        throw e
    }
}


module.exports = { getPlace, getPlaceDetails, autocomplete, place }