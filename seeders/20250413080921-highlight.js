'use strict';


const highlightsServices = require('../services/highlightsServices')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('highlights', [
    //   { name: 'local market nearby', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'close to metro station', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'private/attached balcony', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'public transport nearby', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'gated society', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'no gender/age restrictions', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'newly built', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'separate washrooms', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'housekeeping services available', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'gym nearby', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'park nearby', createdAt: new Date(), updatedAt: new Date() },
    // ]);



    const data = [
      { name: 'local market nearby', createdAt: new Date(), updatedAt: new Date() },
      { name: 'close to metro station', createdAt: new Date(), updatedAt: new Date() },
      { name: 'private/attached balcony', createdAt: new Date(), updatedAt: new Date() },
      { name: 'public transport nearby', createdAt: new Date(), updatedAt: new Date() },
      { name: 'gated society', createdAt: new Date(), updatedAt: new Date() },
      { name: 'no gender/age restrictions', createdAt: new Date(), updatedAt: new Date() },
      { name: 'newly built', createdAt: new Date(), updatedAt: new Date() },
      { name: 'separate washrooms', createdAt: new Date(), updatedAt: new Date() },
      { name: 'housekeeping services available', createdAt: new Date(), updatedAt: new Date() },
      { name: 'gym nearby', createdAt: new Date(), updatedAt: new Date() },
      { name: 'park nearby', createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await highlightsServices.findOne({ where: { name: item.name } });
        if (!exists) {
          await highlightsServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('highlights', null, {});
  }
};
