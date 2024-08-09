'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('availability_types', [
      {availability_type: "immediate", createdAt: new Date(), updatedAt: new Date()},
      {availability_type: "within 15 days", createdAt: new Date(), updatedAt: new Date()},
      {availability_type: "within 30 days", createdAt: new Date(), updatedAt: new Date()},
      {availability_type: "after 30 days", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('availability_types', null, {});
   
  }
};
