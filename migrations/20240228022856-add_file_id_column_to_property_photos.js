'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('property_photos', "file_id", {
      type: Sequelize.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('property_photos', "file_id")

  }
};
