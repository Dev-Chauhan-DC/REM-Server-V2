'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('occupancies', [
      { name: 'single', createdAt: new Date(), updatedAt: new Date() },
      { name: 'shared', createdAt: new Date(), updatedAt: new Date() },
      { name: 'any', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('occupancies', null, {});

  }
};
