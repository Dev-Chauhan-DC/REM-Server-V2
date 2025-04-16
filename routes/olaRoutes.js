const middlewares = require("../middleware/middleware.js");
const olaWebhook = require('../webhook/ola.js')
const { prepath } = require('../utilities');

const olaRouter = (app) => {
    app.get(`${prepath}/ola/autocomplete`,
        olaWebhook.autocomplete
    );

    app.get(`${prepath}/ola/places`,
        olaWebhook.placeDetails
    )
}


module.exports = olaRouter