const {v4} = require("uuid");
const {PutObjectCommand, S3Client} = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");
const s3 = require("../utilities/s3.js");
const responseUtilities = require('../utilities/responseUtilities');
const responses = new responseUtilities()

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
})

const getS3PresignedUrl = async (req, res) => {

    try {
        let name = v4();

        const command = new PutObjectCommand({
            Bucket: "real-estate-properties",
            Key: `dev/${name + "-" + req.body.fileName}`,
            ContentType: req.body.ContentType,
        });

        const url = await getSignedUrl(s3Client, command)

        return res.status(200).send(responses.ok200("", url))

    } catch (e) {
        console.error(e);
        return res.status(500).send(responses.internalServerError500())
    }

}


module.exports = {getS3PresignedUrl}
