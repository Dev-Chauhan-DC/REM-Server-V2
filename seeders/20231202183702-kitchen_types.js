'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('kitchen_types', [
      {kitchen_type: "modular", createdAt: new Date(), updatedAt: new Date()},
      {kitchen_type: "covered shelves", createdAt: new Date(), updatedAt: new Date()},
      {kitchen_type: "open shelves", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('kitchen_types', null, {});
     
  }
};
