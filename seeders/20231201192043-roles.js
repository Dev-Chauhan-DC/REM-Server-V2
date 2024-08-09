'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('user_roles', [
        {role: "user", createdAt: new Date(), updatedAt: new Date()},
        {role: "builder", createdAt: new Date(), updatedAt: new Date()},
        {role: "agent", createdAt: new Date(), updatedAt: new Date()},
      ], {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('user_roles', null, {});

  }
};
