'use strict';

const preferencesServices = require('../services/preferencesServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('preferences', [
    //   { name: 'late nighter', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'early bird', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'studious', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'gym hustler', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'sporty', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'wanderer', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'party lover', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'pet lover', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'vegan', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'non alcoholic', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'music lover', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'non smoker', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'foodie', createdAt: new Date(), updatedAt: new Date() },
    // ]);

    const data = [
      { name: 'late nighter', createdAt: new Date(), updatedAt: new Date() },
      { name: 'early bird', createdAt: new Date(), updatedAt: new Date() },
      { name: 'studious', createdAt: new Date(), updatedAt: new Date() },
      { name: 'gym hustler', createdAt: new Date(), updatedAt: new Date() },
      { name: 'sporty', createdAt: new Date(), updatedAt: new Date() },
      { name: 'wanderer', createdAt: new Date(), updatedAt: new Date() },
      { name: 'party lover', createdAt: new Date(), updatedAt: new Date() },
      { name: 'pet lover', createdAt: new Date(), updatedAt: new Date() },
      { name: 'vegan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'non alcoholic', createdAt: new Date(), updatedAt: new Date() },
      { name: 'music lover', createdAt: new Date(), updatedAt: new Date() },
      { name: 'non smoker', createdAt: new Date(), updatedAt: new Date() },
      { name: 'foodie', createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await preferencesServices.findOne({ where: { name: item.name } });
        if (!exists) {
          await preferencesServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('preferences', null, {});

  }
};
