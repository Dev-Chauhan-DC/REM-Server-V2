const aws = require("aws-sdk")
const fileService = require("../services/filesServices");
const {GetObjectCommand, S3Client} = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");


const region = process.env.REGION
const bucketName = process.env.BUCKET_NAME
const accessKeyId = process.env.ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY


const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
})

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4',
})

async function generateUploadURL() {
    const timestamp = new Date().getTime(); // Current timestamp
    const randomNumber = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    const imageName = `1image_${timestamp}_${randomNumber}`;


    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 1000,
        ACL: 'public-read',
    }

    try {
        const uploadURL = await s3.getSignedUrlPromise('putObject', params)

        return uploadURL
    } catch (error) {
        console.error(error)
    }

}

const s3ReadUrl = async (fileId1) => {


    try {
        const fileId = fileId1;

        const file = await fileService.getFileById(fileId)

        if (!file) {
            return false
        }


        const key = file.storage_key;

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        })

        const url = await getSignedUrl(s3Client, command, {expiresIn: 3600})
        return url
    } catch (error) {
        console.error(error)
        return false
    }

}


module.exports = { generateUploadURL, s3ReadUrl }
