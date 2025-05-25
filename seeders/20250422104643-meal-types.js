'use strict';

const mealTypesServices = require('../services/mealTypesServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('meal_types', [
    //   {
    //     name: 'Breakfast',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     name: 'Lunch',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     name: 'Dinner',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ], {});


    const data = [
      {
        name: 'Breakfast',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lunch',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dinner',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    try {
      for (const item of data) {
        const exists = await mealTypesServices.findOne({ where: { name: item.name } });
        if (!exists) {
          await mealTypesServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('meal_types', null, {});
  }
};
