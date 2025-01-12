const builderServices = require('../services/builderServices.js');
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility')
const { s3ReadUrl } = require('../utilities/s3.js')
const { Op } = require('sequelize');


const create = async (req, res) => {
    try {
        const data = req.body;


        const response = await builderServices.create(data);
        return res.status(200).send(ok200("created successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const read = async (req, res) => {
    try {
        const id = parseInt(req.params.id);


        const response = await builderServices.findOne({ id });

        if (response?.background) {
            const backgroundUrl = await s3ReadUrl(response.background)
            if (backgroundUrl) {
                response.background = backgroundUrl
            }
        }
        if (response.avatar) {
            const avatarUrl = await s3ReadUrl(response.avatar)
            if (avatarUrl) {
                response.avatar = avatarUrl
            }
        }

        return res.status(200).send(ok200("sent successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}
const readAll = async (req, res) => {
    try {


        const name = req.query.name ?
            {
                [Op.like]: `%${req.query.name}%`
            } :
            {
                [Op.like]: `%%`
            }

        const response = await builderServices.findAll({
            where: {
                name
            },
            attributes: ['id', 'name', 'avatar'],
        });




        const updatedResponse = await Promise.all(
            response.map(async (item) => {
                if (item.avatar) {
                    const avatarUrl = await s3ReadUrl(item.avatar);
                    if (avatarUrl) {
                        item.avatar = avatarUrl;
                    }
                }
                return item;
            })
        );


        return res.status(200).send(ok200("sent successfully", updatedResponse))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const readCurrent = async (req, res) => {
    try {
        const id = parseInt(req.user.id);


        const response = await builderServices.findOne({ user_id: id });
        if (response?.background) {
            const backgroundUrl = await s3ReadUrl(response.background)
            if (backgroundUrl) {
                response.background = backgroundUrl
            }
        }
        if (response.avatar) {
            const avatarUrl = await s3ReadUrl(response.avatar)
            if (avatarUrl) {
                response.avatar = avatarUrl
            }
        }



        return res.status(200).send(ok200("sent successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const update = async (req, res) => {
    try {
        const id = parseInt(req.user.id);
        const data = req.body;


        const response = await builderServices.update({ user_id: id }, data);
        return res.status(200).send(ok200("updated successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}


module.exports = { update, create, read, readCurrent, readAll }