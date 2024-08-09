const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const userRolesRoutes = require('./userRolesRoutes')
const propertyRoutes = require('./propertyRoutes')
const propertyAmenitiesRoutes = require('./propertyAmenitiesRoutes')
const propertyPhotosRoutes = require('./propertyPhotosRoutes')
const interestedPeopleRoutes = require('./interestedPeoplesRoutes')
const savePropertyRoutes = require('./savedPropertyRoutes')
const s3Routes = require('./s3Routes')
const paymentRoutes = require('./paymentRoutes')
const userSubscription = require('./userSubscriptionRoutes')
const fileRoutes = require('./fileRoutes')
const googleGeoRouter = require('./googleGeoRouter')


const index = (app) => {


    authRoutes(app)
    userRoutes(app)
    userRolesRoutes(app)
    propertyRoutes(app)
    propertyAmenitiesRoutes(app)
    propertyPhotosRoutes(app)
    interestedPeopleRoutes(app)
    savePropertyRoutes(app)
    s3Routes(app)
    paymentRoutes(app)
    userSubscription(app)
    fileRoutes(app)
    googleGeoRouter(app)


}

module.exports = index;
