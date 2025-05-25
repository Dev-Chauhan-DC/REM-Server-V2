'use strict';

const possessionsServices = require('../services/possessionsServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    // await queryInterface.bulkInsert('possessions', [
    //   {possession: "under constuction", createdAt: new Date(), updatedAt: new Date()},
    //   {possession: "ready to move", createdAt: new Date(), updatedAt: new Date()},
    // ], {});


    const data = [
      { possession: "under constuction", createdAt: new Date(), updatedAt: new Date() },
      { possession: "ready to move", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await possessionsServices.findOne({ where: { possession: item.possession } });
        if (!exists) {
          await possessionsServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('possessions', null, {});

  }
};
