'use strict';

const availabilityTypesServices = require('../services/availabilityTypesServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.bulkInsert('availability_types', [
    //   {availability_type: "immediate", createdAt: new Date(), updatedAt: new Date()},
    //   {availability_type: "within 15 days", createdAt: new Date(), updatedAt: new Date()},
    //   {availability_type: "within 30 days", createdAt: new Date(), updatedAt: new Date()},
    //   {availability_type: "after 30 days", createdAt: new Date(), updatedAt: new Date()},
    // ], {});



    const data = [
      { availability_type: "immediate", createdAt: new Date(), updatedAt: new Date() },
      { availability_type: "within 15 days", createdAt: new Date(), updatedAt: new Date() },
      { availability_type: "within 30 days", createdAt: new Date(), updatedAt: new Date() },
      { availability_type: "after 30 days", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await availabilityTypesServices.findOne({ where: { availability_type: item.availability_type } });
        if (!exists) {
          await availabilityTypesServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('availability_types', null, {});

  }
};
