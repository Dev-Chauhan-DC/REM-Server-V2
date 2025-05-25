'use strict';


const homeTypeServices = require('../services/homeTypeServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.bulkInsert('home_types', [
    //   {home_type: "apartment", createdAt: new Date(), updatedAt: new Date()},
    //   {home_type: "gated community villa", createdAt: new Date(), updatedAt: new Date()},
    //   {home_type: "standalone building", createdAt: new Date(), updatedAt: new Date()},
    //   {home_type: "independent house / villa ", createdAt: new Date(), updatedAt: new Date()},
    // ], {});


    const data = [
      { home_type: "apartment", createdAt: new Date(), updatedAt: new Date() },
      { home_type: "gated community villa", createdAt: new Date(), updatedAt: new Date() },
      { home_type: "standalone building", createdAt: new Date(), updatedAt: new Date() },
      { home_type: "independent house / villa ", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await homeTypeServices.findOne({ where: { home_type: item.home_type } });
        if (!exists) {
          await homeTypeServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }





  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('home_types', null, {});

  }
};
