'use strict';

const waterSuppliesServices = require('../services/waterSuppliesServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.bulkInsert('water_supplies', [
    //   {water_supply: "corporation", createdAt: new Date(), updatedAt: new Date()},
    //   {water_supply: "borewell", createdAt: new Date(), updatedAt: new Date()},
    //   {water_supply: "both", createdAt: new Date(), updatedAt: new Date()},
    // ], {});


    const data = [
      { water_supply: "corporation", createdAt: new Date(), updatedAt: new Date() },
      { water_supply: "borewell", createdAt: new Date(), updatedAt: new Date() },
      { water_supply: "both", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await waterSuppliesServices.findOne({ where: { water_supply: item.water_supply } });
        if (!exists) {
          await waterSuppliesServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }


  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('water_supplies', null, {});

  }
};
