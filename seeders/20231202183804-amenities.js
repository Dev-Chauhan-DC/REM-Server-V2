'use strict';

const amenitiesServices = require('../services/amenitiesServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    // await queryInterface.bulkInsert('amenities', [
    //   {amenitie: "air conditioner", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "club", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "playground", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "gas", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "internet", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "sewage", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "lift", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "fire alarm", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "house keeper", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "park", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "shopping center", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "swimming pool", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "intercom", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "visitor parking", createdAt: new Date(), updatedAt: new Date()},
    //   {amenitie: "rain water harvesting ", createdAt: new Date(), updatedAt: new Date()},
    // ], {});


    const data = [
      { amenitie: "air conditioner", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "club", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "playground", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "gas", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "internet", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "sewage", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "lift", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "fire alarm", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "house keeper", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "park", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "shopping center", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "swimming pool", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "intercom", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "visitor parking", createdAt: new Date(), updatedAt: new Date() },
      { amenitie: "rain water harvesting ", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await amenitiesServices.findOne({ where: { amenitie: item.amenitie } });
        if (!exists) {
          await amenitiesServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('amenities', null, {});

  }
};
