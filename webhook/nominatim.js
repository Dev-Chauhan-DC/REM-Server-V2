const axios = require('axios')



const autocomplete = async (params) => {
    try {
        const result = await axios.get(process.env.NOMINATIM_URL + '/search', { params, timeout: 5000 });
        return result.data;
    } catch (error) {
        throw error
    }
}


module.exports = { autocomplete }