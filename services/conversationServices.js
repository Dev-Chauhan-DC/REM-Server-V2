const ConversationModel = require("../models/index").conversation;
const UserModel = require("../models/index").users;
const { Op } = require('sequelize');



const create = async (data) => {
    try {
        const response = await ConversationModel.create(data)
        return response
    } catch (e) {
        throw e;
    }
}

const findAll = async (data) => {
    try {
        const response = await ConversationModel.findAll(data)
        return response
    } catch (e) {
        throw e;
    }
}
const update = async (data, condition) => {
    try {
        const response = await ConversationModel.update(data, condition)
        return response
    } catch (e) {
        throw e;
    }
}

const destroy = async (condition) => {
    try {
        const response = await ConversationModel.destroy(condition);
        return response;
    } catch (e) {
        throw e;
    }
}

// const createIfNotPresent = async (user1_id, user2_id) => {
//     try {
//         let conversation = await ConversationModel.findOne({
//             where: {
//                 [Op.or]: [
//                     { user1_id, user2_id },
//                     { user1_id: user2_id, user2_id: user1_id } // Check reversed order
//                 ]
//             },
//             attributes: { exclude: ['createdAt', 'updatedAt'] },
//             include: [
//                 {
//                     model: UserModel,
//                     attributes: ['id', 'first_name'],
//                     as: 'user1',
//                 },
//                 {
//                     model: UserModel,
//                     attributes: ['id', 'first_name'],
//                     as: 'user2',
//                 }
//             ]
//         });

//         if (!conversation) {
//             conversation = await ConversationModel.create({ user1_id, user2_id });
//         }

//         return conversation;
//     } catch (error) {
//         throw error;
//     }
// };

const createIfNotPresent = async (user1_id, user2_id) => {
    const condition = {
        [Op.or]: [
            { user1_id, user2_id },
            { user1_id: user2_id, user2_id: user1_id }
        ]
    };

    let conversation = await ConversationModel.findOne({
        where: condition,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            { model: UserModel, attributes: ['id', 'first_name'], as: 'user1' },
            { model: UserModel, attributes: ['id', 'first_name'], as: 'user2' }
        ]
    });

    if (!conversation) {
        await ConversationModel.create({ user1_id, user2_id });
        conversation = await ConversationModel.findOne({
            where: condition,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                { model: UserModel, attributes: ['id', 'first_name'], as: 'user1' },
                { model: UserModel, attributes: ['id', 'first_name'], as: 'user2' }
            ]
        });
    }

    return conversation;
};


const getConversationsByUser = async (userId) => {
    try {
        const conversations = await ConversationModel.findAll({
            where: {
                [Op.or]: [
                    { user1_id: userId },
                    { user2_id: userId }
                ]
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'first_name'],
                    as: 'user1',
                },
                {
                    model: UserModel,
                    attributes: ['id', 'first_name'],
                    as: 'user2',
                }
            ]
        });

        return conversations;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    create, findAll, update, destroy, createIfNotPresent
    , getConversationsByUser
}
