const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const fileupload = require("express-fileupload");
const cron = require('node-cron');
const schaduleFunction = require("./utilities/schaduleFunction.js")
const http = require("http");
const { initializeSocket } = require("./socket/index.js");


cron.schedule('0 8 * * *', () => {
    schaduleFunction.checkUserSubscription()
});

const routes = require("./routes/index")

const app = express()
const port = process.env.PORT;

// Create an HTTP server and attach Express to it
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());

routes(app);
// Initialize Socket.IO
initializeSocket(server);

server.listen(port, () => {
    console.info("server is running on ", port)
})

