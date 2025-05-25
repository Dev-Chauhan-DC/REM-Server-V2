'use strict';

const subscriptionPlanServices = require('../services/subscriptionPlanServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.bulkInsert('subscription_plans', [
    //   {
    //     name: "week",
    //     day: 7,
    //     price: 20,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     name: "half_month",
    //     day: 15,
    //     price: 50,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     name: "month",
    //     day: 30,
    //     price: 100,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    // ], {});


    const data = [
      {
        name: "week",
        day: 7,
        price: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "half_month",
        day: 15,
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "month",
        day: 30,
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    try {
      for (const item of data) {
        const exists = await subscriptionPlanServices.findOne({ where: { name: item.name } });
        if (!exists) {
          await subscriptionPlanServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }



  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('subscription_plans', null, {});
  }
};
