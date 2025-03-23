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
const otpRoutes = require('./otpRoutes')
const builderRoutes = require('./builderRoutes')
const builderTeamRoutes = require('./builderTeamRoutes')
const BuilderAddressRoutes = require('./builderAddressRoutes')
const BuilderCertificateRoutes = require('./builderCertificateRoutes')
const BuilderUpdateRoutes = require('./builderUpdateRoutes')
const agentRoutes = require('./agentRoutes')
const AgentAddressRoutes = require('./agentAddressRoutes')
const AgentCertificateRoutes = require('./agentCertificateRoutes')
const PhotoCategoryRoutes = require('./photoCategoryRoutes')
const AreaRoutes = require('./areaRoutes')
const DistrictRoutes = require('./districtRoutes')
const StateRoutes = require('./stateRoutes')
const ConversationRoutes = require('./conversationRoutes')
const ChatRoutes = require('./chatRoutes')


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
    otpRoutes(app)
    builderRoutes(app)
    builderTeamRoutes(app)
    BuilderAddressRoutes(app)
    BuilderCertificateRoutes(app)
    BuilderUpdateRoutes(app)
    agentRoutes(app)
    AgentAddressRoutes(app)
    AgentCertificateRoutes(app)
    PhotoCategoryRoutes(app)
    AreaRoutes(app)
    DistrictRoutes(app)
    StateRoutes(app)
    ConversationRoutes(app)
    ChatRoutes(app)

}

module.exports = index;
