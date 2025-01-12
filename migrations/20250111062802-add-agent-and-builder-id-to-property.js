'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('properties', 'agent_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('properties', 'builder_id', {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('properties', 'agent_id');
    await queryInterface.removeColumn('properties', 'builder_id');
  }
};
