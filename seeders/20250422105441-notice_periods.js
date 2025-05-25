'use strict';

const noticePeriodsServices = require('../services/noticePeriodsServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('notice_periods', [
    //   { name: 'Immediate', createdAt: new Date(), updatedAt: new Date() },
    //   { name: '1 Week', createdAt: new Date(), updatedAt: new Date() },
    //   { name: 'Half Month', createdAt: new Date(), updatedAt: new Date() },
    //   { name: '1 Month', createdAt: new Date(), updatedAt: new Date() },
    //   { name: '2 Month', createdAt: new Date(), updatedAt: new Date() }
    // ], {});


    const data = [
      { name: 'Immediate', createdAt: new Date(), updatedAt: new Date() },
      { name: '1 Week', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Half Month', createdAt: new Date(), updatedAt: new Date() },
      { name: '1 Month', createdAt: new Date(), updatedAt: new Date() },
      { name: '2 Month', createdAt: new Date(), updatedAt: new Date() }
    ]

    try {
      for (const item of data) {
        const exists = await noticePeriodsServices.findOne({ where: { name: item.name } });
        if (!exists) {
          await noticePeriodsServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notice_periods', null, {});
  }
};
