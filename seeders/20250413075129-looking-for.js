'use strict';
const lookingForServices = require('../services/lookingForServices')



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('looking_fors', [
    //   { name: 'male', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'female', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'any', createdAt: new Date(), updatedAt: new Date() },
    // ]);


    const data = [
      { name: 'male', createdAt: new Date(), updatedAt: new Date() },
      { name: 'female', createdAt: new Date(), updatedAt: new Date() },
      { name: 'any', createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await lookingForServices.findOne({ where: { name: item.name } });
        if (!exists) {
          await lookingForServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('looking_fors', null, {});
  }
};
