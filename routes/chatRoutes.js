const { prepath } = require('../utilities/index.js');
const middlewares = require("../middleware/middleware.js");
const chatControllers = require('../controllers/chatControllers.js');


const ChatRoutes = (app) => {
    app.post(`${prepath}/chat`,
        middlewares.isAuthenticate,
        chatControllers.create);

    app.get(`${prepath}/chat/:conversation_id`,
        middlewares.isAuthenticate,
        chatControllers.get);
}


module.exports = ChatRoutes
