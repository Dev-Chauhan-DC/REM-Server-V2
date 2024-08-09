const {body} = require("express-validator");
const createPropertyImageFilesValidator = [

    body('propertyId')
        .notEmpty().withMessage('Property Id is Require')
        .isInt({gt: 0}).withMessage('Invalid ID'),
    body('imageFileIds').custom((value) => {
        let imageFileIdsArr = [];

        if(typeof value === 'string'){
            try {
                imageFileIdsArr = JSON.parse(value);
            } catch (err) {
                throw new Error('Invalid Photo File ID')
            }
        }else if(Array.isArray(value)){
            imageFileIdsArr = value
        }

        if(imageFileIdsArr.length < 3){
            throw new Error('minimum limit is 3')
        }

        if(imageFileIdsArr.length > 10){
            throw new Error('maximum limit is 10')
        }

        for(let i = 0; i < imageFileIdsArr.length; i++){

            if(isNaN(parseInt(imageFileIdsArr[i]))){
                throw new Error('Invalid Photo File ID')
            }

        }

        const uniqueItems = new Set(imageFileIdsArr);
        if (uniqueItems.size !== imageFileIdsArr.length) {
            throw new Error('Array must not contain duplicate elements');
        }


        return true;
    }),

]

module.exports = {createPropertyImageFilesValidator}
