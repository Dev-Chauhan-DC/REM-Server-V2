const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility')
const { s3ReadUrl } = require("../utilities/s3");
const photonWebhook = require("../webhook/photon.js")
const nominatimWebhook = require("../webhook/nominatim.js")
const googleGeoWebhook = require("../webhook/googleGeoWebhook.js");
const { photonToGoogleFormat, nominatimToGoogleFormat, googleToGoogleFormat } = require('../utilities/geo/index.js');





const autocomplete = async (req, res) => {
    const query = req.query.query;

    try {
        // Try Photon
        const photonResult = await photonWebhook.autocomplete({ q: query, limit: 4, bbox: '68.07,6.75,97.42,37.10' });
        const formattedPhoton = photonToGoogleFormat(photonResult?.features);

        if (formattedPhoton.length > 0) {
            return res.status(200).send(ok200("sent", formattedPhoton));
        }

        throw new Error('Photon returned empty array');

    } catch (error) {
        console.error('Photon error:', error);

        try {
            // Try Nominatim
            const nominatimResult = await nominatimWebhook.autocomplete({ q: query, format: 'json', countrycodes: 'in', limit: 4 });
            const formattedNominatim = nominatimToGoogleFormat(nominatimResult);

            if (formattedNominatim.length > 0) {
                return res.status(200).send(ok200("sent", formattedNominatim));
            }

            throw new Error('Nominatim returned empty array');

        } catch (error) {
            console.error('Nominatim error:', error);

            try {
                // Try Google
                const googleResult = await googleGeoWebhook.autocomplete({ input: query, fields: 'name,place_id' });
                const formattedGoogle = googleToGoogleFormat(googleResult);

                return res.status(200).send(ok200("sent", formattedGoogle));
            } catch (error) {
                console.error('Google error:', error);
                return res.status(500).send(internalServerError500("error", error));
            }
        }
    }
};



const place = async (req, res) => {
    try {
        const data = req.body;
        let result;
        if (data?.provider === 'google') {
            result = await googleGeoWebhook.place({
                placeid: data.place_id,
                fields: 'geometry'
            })

            return res.status(200).send(ok200("sent", {
                ...data,
                ...result?.result
            }))

        }


        return res.status(200).send(ok200("sent", data))


    } catch (error) {
        console.error(error)
        return res.status(200).send(internalServerError500())
    }
}

module.exports = { autocomplete, place }
