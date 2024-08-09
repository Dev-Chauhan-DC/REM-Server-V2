const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const fileupload = require("express-fileupload");
const cron = require('node-cron');
const schaduleFunction = require("./utilities/schaduleFunction.js")

cron.schedule('0 8 * * *', () => {
    schaduleFunction.checkUserSubscription()
});

const routes = require("./routes/index")

const app = express()
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());

routes(app);

app.listen(port, () => {
    console.log("server is running on ", port)
})

