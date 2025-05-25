'use strict';

const tenantsServices = require('../services/tenantsServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    // await queryInterface.bulkInsert('tenants', [
    //   {tenant: "anyone", createdAt: new Date(), updatedAt: new Date()},
    //   {tenant: "family", createdAt: new Date(), updatedAt: new Date()},
    //   {tenant: "bachelor male", createdAt: new Date(), updatedAt: new Date()},
    //   {tenant: "bachelor female", createdAt: new Date(), updatedAt: new Date()},
    //   {tenant: "company", createdAt: new Date(), updatedAt: new Date()},
    // ], {});

    const data = [
      { tenant: "anyone", createdAt: new Date(), updatedAt: new Date() },
      { tenant: "family", createdAt: new Date(), updatedAt: new Date() },
      { tenant: "bachelor male", createdAt: new Date(), updatedAt: new Date() },
      { tenant: "bachelor female", createdAt: new Date(), updatedAt: new Date() },
      { tenant: "company", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await tenantsServices.findOne({ where: { tenant: item.tenant } });
        if (!exists) {
          await tenantsServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }



  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('tenants', null, {});

  }
};
