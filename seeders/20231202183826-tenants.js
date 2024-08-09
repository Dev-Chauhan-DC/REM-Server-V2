'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   

    await queryInterface.bulkInsert('tenants', [
      {tenant: "anyone", createdAt: new Date(), updatedAt: new Date()},
      {tenant: "family", createdAt: new Date(), updatedAt: new Date()},
      {tenant: "bachelor male", createdAt: new Date(), updatedAt: new Date()},
      {tenant: "bachelor female", createdAt: new Date(), updatedAt: new Date()},
      {tenant: "company", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('tenants', null, {});
     
  }
};
