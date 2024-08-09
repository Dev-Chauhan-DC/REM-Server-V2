'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('furnishings', [
      {furnishing: "full", createdAt: new Date(), updatedAt: new Date()},
      {furnishing: "semi", createdAt: new Date(), updatedAt: new Date()},
      {furnishing: "none", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('furnishings', null, {});
     
  }
};
