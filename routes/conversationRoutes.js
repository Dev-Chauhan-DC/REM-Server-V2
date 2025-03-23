const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const conversationControllers = require('../controllers/conversationControllers.js');
const validate = require("../middleware/validate")
const conversationValidator = require('../validators/conversationValidator.js')



const ConversationRoutes = (app) => {
    app.post(`${prepath}/conversation`,
        middlewares.isAuthenticate,
        conversationValidator.create, validate,
        conversationControllers.create);

    app.get(`${prepath}/conversation`,
        middlewares.isAuthenticate,
        conversationControllers.get);
}


module.exports = ConversationRoutes
