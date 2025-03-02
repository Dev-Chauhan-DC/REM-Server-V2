'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      circle_name: {
        type: Sequelize.STRING
      },
      region_name: {
        type: Sequelize.STRING
      },
      division_name: {
        type: Sequelize.STRING
      },
      office_name: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.STRING
      },
      office_type: {
        type: Sequelize.STRING
      },
      delivery: {
        type: Sequelize.STRING
      },
      district_name: {
        type: Sequelize.STRING
      },
      state_name: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('areas');
  }
};