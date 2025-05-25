'use strict';
const powerBackupsServices = require('../services/powerBackupsServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('power_backups', [
    //   {power_backup: "full", createdAt: new Date(), updatedAt: new Date()},
    //   {power_backup: "partial", createdAt: new Date(), updatedAt: new Date()},
    //   {power_backup: "none", createdAt: new Date(), updatedAt: new Date()},
    // ], {});


    const data = [
      { power_backup: "full", createdAt: new Date(), updatedAt: new Date() },
      { power_backup: "partial", createdAt: new Date(), updatedAt: new Date() },
      { power_backup: "none", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await powerBackupsServices.findOne({ where: { power_backup: item.power_backup } });
        if (!exists) {
          await powerBackupsServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }


  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('power_backups', null, {});

  }
};
