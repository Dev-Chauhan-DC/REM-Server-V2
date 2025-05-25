'use strict';
const purposeServices = require('../services/purposeServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.bulkInsert('purposes', [
    //   { purpose: "sell", createdAt: new Date(), updatedAt: new Date() },
    //   { purpose: "rent", createdAt: new Date(), updatedAt: new Date() },
    // ], {});


    const data = [
      { purpose: "sell", createdAt: new Date(), updatedAt: new Date() },
      { purpose: "rent", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await purposeServices.findOne({ where: { purpose: item.purpose } });
        if (!exists) {
          await purposeServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }




  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('purposes', null, {});


  }
};
