'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('coupons', [
      {
        code: "50OFF",
        discount_percentage: 50,
        is_active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: "100OFF",
        discount_percentage: 100,
        is_active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('coupons', null, {});
  }
};
