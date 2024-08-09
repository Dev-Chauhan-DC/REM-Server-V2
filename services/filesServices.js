const FilesModel = require('../models/index').files





const createFile = async (data) => {
    try{
        const response = await FilesModel.create({
            name: data.name,
            size: data.size,
            type: data.type,
            storage_key: data.storage_key,
        })
        return response;
    }catch (e) {
        throw e;
    }
}


const getFileById = async (id) => {
    try{
        const response = await FilesModel.findOne({
            where: {
                id: id
            }
        })

        return response;
    }catch (e) {
        console.error(e)
        throw e;
    }
}


module.exports = {createFile, getFileById}
