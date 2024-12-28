'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('project_types', [
      { name: "completed", createdAt: new Date(), updatedAt: new Date() },
      { name: "ongoing", createdAt: new Date(), updatedAt: new Date() },
      { name: "upcoming", createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_types', null, {});
  }
};
