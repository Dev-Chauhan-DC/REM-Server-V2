'use strict';

const furnishingsServices = require('../services/furnishingsServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.bulkInsert('furnishings', [
    //   {furnishing: "full", createdAt: new Date(), updatedAt: new Date()},
    //   {furnishing: "semi", createdAt: new Date(), updatedAt: new Date()},
    //   {furnishing: "none", createdAt: new Date(), updatedAt: new Date()},
    // ], {});


    const data = [
      { furnishing: "full", createdAt: new Date(), updatedAt: new Date() },
      { furnishing: "semi", createdAt: new Date(), updatedAt: new Date() },
      { furnishing: "none", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await furnishingsServices.findOne({ where: { furnishing: item.furnishing } });
        if (!exists) {
          await furnishingsServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('furnishings', null, {});

  }
};
