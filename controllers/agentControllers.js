const agentServices = require('../services/agentServices.js');
const { ok200, badRequest400, internalServerError500, notFound404 } = require('../utilities/responseUtility.js')
const { s3ReadUrl } = require('../utilities/s3.js')
const { Op } = require('sequelize');


const create = async (req, res) => {
    try {
        const user_roles_id = parseInt(req.user.user_roles_id);
        const id = parseInt(req.user.id);

        if (user_roles_id !== 3) {
            return res.status(400).send(badRequest400("You are not allowed to create an agent profile"))
        }

        const isUserId = await agentServices.findOne({ user_id: id });

        if (isUserId) {
            return res.status(400).send(badRequest400("You already have an agent profile"))
        }

        const data = req.body;
        data.user_id = req.user.id;

        const response = await agentServices.create(data);
        return res.status(200).send(ok200("created successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}

const read = async (req, res) => {
    try {
        const id = parseInt(req.params.id);


        const response = await agentServices.findOne({ id });

        if (response?.background) {
            const backgroundUrl = await s3ReadUrl(response.background)
            if (backgroundUrl) {
                response.background = backgroundUrl
            }
        }
        if (response?.avatar) {
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

        const response = await agentServices.findAll({
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


        const response = await agentServices.findOne({ user_id: id });
        if (response?.background) {
            const backgroundUrl = await s3ReadUrl(response.background)
            if (backgroundUrl) {
                response.background = backgroundUrl
            }
        }
        if (response?.avatar) {
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


        const response = await agentServices.update({ user_id: id }, data);
        return res.status(200).send(ok200("updated successfully", response))
    } catch (e) {
        console.error(e)
        return res.status(500).send(internalServerError500())
    }
}


module.exports = { readAll, update, create, read, readCurrent }