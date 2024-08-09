const middlewares = require("../middleware/middleware.js");
const googleGeoWebhook = require('../webhook/googleGeoWebhook.js')

const googleGeoRouter = (app) => {
    app.get("/place/autocomplete",
        middlewares.isAuthenticate,
        googleGeoWebhook.getPlace
    );

    app.get("/place/details",
        middlewares.isAuthenticate,
        googleGeoWebhook.getPlaceDetails
    )


}


module.exports = googleGeoRouter