'use strict';

const flooringTypesServices = require('../services/flooringTypesServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('flooring_types', [
    //   {flooring_type: "cement", createdAt: new Date(), updatedAt: new Date()},
    //   {flooring_type: "mosaic", createdAt: new Date(), updatedAt: new Date()},
    //   {flooring_type: "marble / granite", createdAt: new Date(), updatedAt: new Date()},
    //   {flooring_type: "wooden", createdAt: new Date(), updatedAt: new Date()},
    //   {flooring_type: "vitrified tiles", createdAt: new Date(), updatedAt: new Date()},
    // ], {});



    const data = [
      { flooring_type: "cement", createdAt: new Date(), updatedAt: new Date() },
      { flooring_type: "mosaic", createdAt: new Date(), updatedAt: new Date() },
      { flooring_type: "marble / granite", createdAt: new Date(), updatedAt: new Date() },
      { flooring_type: "wooden", createdAt: new Date(), updatedAt: new Date() },
      { flooring_type: "vitrified tiles", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await flooringTypesServices.findOne({ where: { flooring_type: item.flooring_type } });
        if (!exists) {
          await flooringTypesServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }




  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('flooring_types', null, {});

  }
};
