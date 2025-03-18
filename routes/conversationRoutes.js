const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const conversationControllers = require('../controllers/conversationControllers.js');


const ConversationRoutes = (app) => {
    app.post(`${prepath}/conversation`,
        middlewares.isAuthenticate,
        conversationControllers.create);
}


module.exports = ConversationRoutes
