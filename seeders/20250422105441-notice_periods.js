'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notice_periods', [
      { name: 'Immediate', createdAt: new Date(), updatedAt: new Date() },
      { name: '1 Week', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Half Month', createdAt: new Date(), updatedAt: new Date() },
      { name: '1 Month', createdAt: new Date(), updatedAt: new Date() },
      { name: '2 Month', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notice_periods', null, {});
  }
};
