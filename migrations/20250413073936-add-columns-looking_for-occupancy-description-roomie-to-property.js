'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('properties', 'looking_for_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('properties', 'occupancy_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('properties', 'description_roomie', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('properties', 'looking_for_id');
    await queryInterface.removeColumn('properties', 'occupancy_id');
    await queryInterface.removeColumn('properties', 'description_roomie');
  }
};
