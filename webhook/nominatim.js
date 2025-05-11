const axios = require('axios')



const autocomplete = async (params) => {
    try {
        const result = await axios.get(process.env.NOMINATIM_URL + '/search', { params });
        return result.data;
    } catch (error) {
        throw error
    }
}


module.exports = { autocomplete }