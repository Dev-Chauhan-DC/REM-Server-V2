const middlewares = require("../middleware/middleware.js");
const googleGeoWebhook = require('../webhook/googleGeoWebhook.js')
const { prepath } = require('../utilities');

const googleGeoRouter = (app) => {
    app.get(`${prepath}/place/autocomplete`,
        middlewares.isAuthenticate,
        googleGeoWebhook.getPlace
    );

    app.get(`${prepath}/place/details`,
        middlewares.isAuthenticate,
        googleGeoWebhook.getPlaceDetails
    )


}


module.exports = googleGeoRouter