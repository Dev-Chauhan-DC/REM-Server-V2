const userServices = require("../services/userServices");
const responseUtilities = require('../utilities/responseUtilities');
const responses = new responseUtilities()
const builderService = require('../services/builderServices.js');
const agentService = require('../services/agentServices.js');


const updateRole = async (req, res) => {


    try {

        const userId = req.userId;
        const roleId = req.body.roleId;


        const roleIdNumber = parseInt(roleId);
        const userIdNumber = parseInt(userId);

        if (roleIdNumber === 2) {

            const builder = await builderService.findOne({ user_id: userIdNumber });


            if (!builder) {
                await builderService.create({ user_id: userIdNumber });
            }

            if (builder) {
                return res.status(400).send(responses.badRequest400("Builder already exists", null))
            }
        }

        if (roleIdNumber === 3) {

            const agent = await agentService.findOne({ user_id: userIdNumber });


            if (!agent) {
                await agentService.create({ user_id: userIdNumber });
            }

            if (agent) {
                return res.status(400).send(responses.badRequest400("Agent already exists", null))
            }
        }

        const role = await userServices.updateRole(userId, roleId);

        return res.status(200).send(responses.ok200("", role))

    } catch (error) {
        return res.status(500).send(responses.internalServerError500())
    }

}


const getUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userServices.getUser(userId);


        if (!user) {
            return res.status(404).send(responses.notFound404("User not found", null))
        }

        return res.status(200).send(responses.ok200("", user))

    } catch (e) {
        return res.status(500).send(responses.internalServerError500())
    }

}

const updateProfileInfo = async (req, res) => {

    try {
        const userId = parseInt(req.userId);
        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const secondaryNumber = req.body.secondaryNumber;
        const aadhaarNumber = req.body.aadhaarNumber;
        const avatar = req.body.avatar;
        const agencyName = req.body.agencyName;
        const companyName = req.body.companyName;

        const profileInfo = await userServices.updateProfileInfo(userId, email, firstName, lastName, secondaryNumber, aadhaarNumber, avatar, agencyName, companyName);

        return res.status(200).send(responses.ok200("", profileInfo))
    } catch (error) {
        console.error(error)
        return res.status(500).send(responses.internalServerError500())
    }

}


const getUserV2 = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userServices.findOneUser({
            where: {
                id: id
            }
        })
        return res.status(200).send(responses.ok200('', user))
    } catch (e) {
        console.error(error);
        return res.status(500).send(responses.internalServerError500());
    }
}
const userUpdate = async (req, res) => {
    try {
        const userId = parseInt(req.user.id);
        const user = req.body

        const result = await userServices.update({
            first_name: user.first_name
        },
            {
                where: {
                    id: userId
                }
            })

        return res.status(200).send(responses.ok200('updated', result))
    } catch (e) {
        console.error(error);
        return res.status(500).send(responses.internalServerError500());
    }
}


module.exports = { userUpdate, updateRole, getUser, updateProfileInfo, getUserV2 }
