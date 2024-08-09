const {body} = require("express-validator");


const createPropertyAmenitiesValidator = [
    body('propertyId')
        .notEmpty().withMessage('Property Id is Require')
        .isInt({gt: 0}).withMessage('Invalid ID'),

    body('amenitiesArray').custom((value) => {
        let amenityArr = [];

        if(typeof value === 'string'){
            try {
                amenityArr = JSON.parse(value);
            } catch (err) {
                throw new Error('Invalid Amenities')
            }
        }

        for(let i = 0; i < amenityArr.length; i++){

            if(isNaN(parseInt(amenityArr[i]))){
                throw new Error('Invalid Amenity ID')
            }

            if(![1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].includes(amenityArr[i])){
                throw new Error('Amenities Must be 1,2,3,4,5,6,7,8,9,10,11,12,13,14,or 15')
            }


        }

        const uniqueItems = new Set(amenityArr);
        if (uniqueItems.size !== amenityArr.length) {
            throw new Error('Array must not contain duplicate elements');
        }


        return true;
    }),
]



module.exports = {createPropertyAmenitiesValidator}
