'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('power_backups', [
      {power_backup: "full", createdAt: new Date(), updatedAt: new Date()},
      {power_backup: "partial", createdAt: new Date(), updatedAt: new Date()},
      {power_backup: "none", createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('power_backups', null, {});
     
  }
};
