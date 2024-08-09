'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('ownership_types', [
      {ownership_type: "self owned", createdAt: new Date(), updatedAt: new Date()},
      {ownership_type: "on lease", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('ownership_types', null, {});
    
  }
};
