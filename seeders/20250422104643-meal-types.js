'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('meal_types', [
      {
        name: 'Breakfast',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lunch',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dinner',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('meal_types', null, {});
  }
};
