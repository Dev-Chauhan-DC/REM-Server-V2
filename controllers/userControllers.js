const userServices = require("../services/userServices");
const responseUtilities = require('../utilities/responseUtilities');
const responses = new responseUtilities()


const updateRole = async (req, res) => {


    try {

        const userId = req.userId;
        const roleId = req.body.roleId;

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


module.exports = { updateRole, getUser, updateProfileInfo }
