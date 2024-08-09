'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('water_supplies', [
      {water_supply: "corporation", createdAt: new Date(), updatedAt: new Date()},
      {water_supply: "borewell", createdAt: new Date(), updatedAt: new Date()},
      {water_supply: "both", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('water_supplies', null, {});
     
  }
};
