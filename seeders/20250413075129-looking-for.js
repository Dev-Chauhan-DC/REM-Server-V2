'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('looking_fors', [
      { name: 'male', createdAt: new Date(), updatedAt: new Date() },
      { name: 'female', createdAt: new Date(), updatedAt: new Date() },
      { name: 'any', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('looking_fors', null, {});
  }
};
