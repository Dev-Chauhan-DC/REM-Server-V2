'use strict';
const ownershipTypesServices = require('../services/ownershipTypesServices')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.bulkInsert('ownership_types', [
    //   {ownership_type: "self owned", createdAt: new Date(), updatedAt: new Date()},
    //   {ownership_type: "on lease", createdAt: new Date(), updatedAt: new Date()},
    // ], {});


    const data = [
      { ownership_type: "self owned", createdAt: new Date(), updatedAt: new Date() },
      { ownership_type: "on lease", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await ownershipTypesServices.findOne({ where: { ownership_type: item.ownership_type } });
        if (!exists) {
          await ownershipTypesServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('ownership_types', null, {});

  }
};
