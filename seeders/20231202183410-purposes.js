'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('purposes', [
      { purpose: "sell", createdAt: new Date(), updatedAt: new Date() },
      { purpose: "rent", createdAt: new Date(), updatedAt: new Date() },
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('purposes', null, {});


  }
};
