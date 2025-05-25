'use strict';

const occupancyServices = require('../services/occupancyServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('occupancies', [
    //   { name: 'single', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'shared', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'any', createdAt: new Date(), updatedAt: new Date() },
    // ]);


    const data = [
      { name: 'single', createdAt: new Date(), updatedAt: new Date() },
      { name: 'shared', createdAt: new Date(), updatedAt: new Date() },
      { name: 'any', createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await occupancyServices.findOne({ where: { name: item.name } });
        if (!exists) {
          await occupancyServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('occupancies', null, {});

  }
};
