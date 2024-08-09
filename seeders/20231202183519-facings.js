'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('facings', [
      {facing: "north", createdAt: new Date(), updatedAt: new Date()},
      {facing: "south", createdAt: new Date(), updatedAt: new Date()},
      {facing: "east", createdAt: new Date(), updatedAt: new Date()},
      {facing: "west", createdAt: new Date(), updatedAt: new Date()},
      {facing: "north - west", createdAt: new Date(), updatedAt: new Date()},
      {facing: "north - east", createdAt: new Date(), updatedAt: new Date()},
      {facing: "south - west", createdAt: new Date(), updatedAt: new Date()},
      {facing: "south - east", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('facings', null, {});
    
  }
};
