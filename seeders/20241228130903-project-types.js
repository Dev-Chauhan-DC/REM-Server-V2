'use strict';

const projectTypesServices = require('../services/projectTypesServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('project_types', [
    //   { name: "completed", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "ongoing", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "upcoming", createdAt: new Date(), updatedAt: new Date() },
    // ], {});



    const data = [
      { name: "completed", createdAt: new Date(), updatedAt: new Date() },
      { name: "ongoing", createdAt: new Date(), updatedAt: new Date() },
      { name: "upcoming", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await projectTypesServices.findOne({ where: { name: item.name } });
        if (!exists) {
          await projectTypesServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_types', null, {});
  }
};
