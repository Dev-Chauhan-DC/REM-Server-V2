const userRolesServices = require('../services/userRolesServices')
const responseUtilities = require('../utilities/responseUtilities')
const responses = new responseUtilities()


const getRoles = async (req, res) => {
    try {
        const roles = await userRolesServices.getRoles()

        return res.status(200).send(responses.ok200("", roles))

    } catch (error) {
        console.error(error)
        return res.status(500).send(responses.internalServerError500())
    }
}


module.exports = {getRoles}
