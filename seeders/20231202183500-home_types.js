'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('home_types', [
      {home_type: "apartment", createdAt: new Date(), updatedAt: new Date()},
      {home_type: "gated community villa", createdAt: new Date(), updatedAt: new Date()},
      {home_type: "standalone building", createdAt: new Date(), updatedAt: new Date()},
      {home_type: "independent house / villa ", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('home_types', null, {});

  }
};
