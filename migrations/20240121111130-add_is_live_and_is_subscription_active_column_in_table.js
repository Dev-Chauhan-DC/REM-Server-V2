'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("properties", "is_live", {
      type: Sequelize.TINYINT
    })

    await queryInterface.addColumn("properties", "is_subscription_active", {
      type: Sequelize.TINYINT
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("properties", "is_live")
    await queryInterface.removeColumn("properties", "is_subscription_active")
  }
};
