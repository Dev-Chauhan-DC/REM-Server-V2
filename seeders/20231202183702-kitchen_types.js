'use strict';

const kitchenTypesServices = require('../services/kitchenTypesServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.bulkInsert('kitchen_types', [
    //   {kitchen_type: "modular", createdAt: new Date(), updatedAt: new Date()},
    //   {kitchen_type: "covered shelves", createdAt: new Date(), updatedAt: new Date()},
    //   {kitchen_type: "open shelves", createdAt: new Date(), updatedAt: new Date()},
    // ], {});

    const data = [
      { kitchen_type: "modular", createdAt: new Date(), updatedAt: new Date() },
      { kitchen_type: "covered shelves", createdAt: new Date(), updatedAt: new Date() },
      { kitchen_type: "open shelves", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await kitchenTypesServices.findOne({ where: { kitchen_type: item.kitchen_type } });
        if (!exists) {
          await kitchenTypesServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }



  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('kitchen_types', null, {});

  }
};
