'use strict';
const userRolesServices = require('../services/userRolesServices')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const data = [
      { role: "user", createdAt: new Date(), updatedAt: new Date() },
      { role: "builder", createdAt: new Date(), updatedAt: new Date() },
      { role: "agent", createdAt: new Date(), updatedAt: new Date() },
      { role: "admin", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await userRolesServices.findOne({ where: { role: item.role } });
        if (!exists) {
          await userRolesServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {});
  }
};
