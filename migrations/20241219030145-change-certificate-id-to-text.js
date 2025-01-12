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
    await queryInterface.changeColumn('builder_certificates', 'certificate_id', {
      type: Sequelize.TEXT,
      allowNull: true, // Or false, based on your needs
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('builder_certificates', 'certificate_id', {
      type: Sequelize.STRING,
      allowNull: true, // Or false, based on your needs
    });
  }
};
