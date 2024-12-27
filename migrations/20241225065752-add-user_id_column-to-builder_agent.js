'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('builders', 'user_id', {
      type: Sequelize.INTEGER, // Change to the desired column type
      allowNull: false,      // Set to `true` if the column can have null values
      defaultValue: 0, // Temporary value
    });
    await queryInterface.addColumn('agent_profiles', 'user_id', {
      type: Sequelize.INTEGER, // Change to the desired column type
      allowNull: false,      // Set to `true` if the column can have null values
      defaultValue: 0, // Temporary value
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('builders', 'user_id');
    await queryInterface.removeColumn('agent_profiles', 'user_id');
  }
};
