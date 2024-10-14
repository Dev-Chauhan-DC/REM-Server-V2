const middlewares = require("../middleware/middleware.js");
const googleGeoWebhook = require('../webhook/googleGeoWebhook.js')
const { prepath } = require('../utilities');

const googleGeoRouter = (app) => {
    app.get(`${prepath}/place/autocomplete`,

        googleGeoWebhook.getPlace
    );

    app.get(`${prepath}/place/details`,

        googleGeoWebhook.getPlaceDetails
    )


}


module.exports = googleGeoRouter