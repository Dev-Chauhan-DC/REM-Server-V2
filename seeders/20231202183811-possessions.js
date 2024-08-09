'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   

    await queryInterface.bulkInsert('possessions', [
      {possession: "under constuction", createdAt: new Date(), updatedAt: new Date()},
      {possession: "ready to move", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('possessions', null, {});
     
  }
};
