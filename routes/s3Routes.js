const s3Controllers = require("../controllers/s3Controllers");
const { prepath } = require('../utilities');



const s3Routes = (app) => {
    app.post(`${prepath}/s3/get-presigned-url`, s3Controllers.getS3PresignedUrl);
}

module.exports = s3Routes
