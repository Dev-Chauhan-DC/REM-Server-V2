'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('properties', 'single_sharing', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('properties', 'double_sharing', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('properties', 'triple_sharing', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('properties', 'four_sharing', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('properties', 'single_sharing');
    await queryInterface.removeColumn('properties', 'double_sharing');
    await queryInterface.removeColumn('properties', 'triple_sharing');
    await queryInterface.removeColumn('properties', 'four_sharing');
  }
};
