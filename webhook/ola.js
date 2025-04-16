const { ok200, badRequest400, internalServerError500 } = require('../utilities/responseUtility')
const axios = require('axios')

const autocomplete = async (req, res) => {
    try {
        const { input } = req.query;

        const response = await axios.get('https://api.olamaps.io/places/v1/autocomplete', {
            params: {
                input,
                api_key: process.env.OLA_API_KEY
            },
        });

        return res.status(200).send(ok200("sent successfully", response.data))
    } catch (e) {
        // console.error(e)
        return res.status(200).send(ok200("sent successfully", e.response.data))

    }
}

const placeDetails = async (req, res) => {
    try {
        const { place_id } = req.query;

        const response = await axios.get('https://api.olamaps.io/places/v1/details', {
            params: {
                place_id,
                api_key: process.env.OLA_API_KEY
            },
        });

        return res.status(200).send(ok200("sent successfully", response.data))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())

    }
}



module.exports = { autocomplete, placeDetails }