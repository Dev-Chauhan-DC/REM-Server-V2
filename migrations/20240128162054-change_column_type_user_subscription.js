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

    await queryInterface.changeColumn('user_subscriptions', "order_id", {
      type: Sequelize.TEXT
    });
    await queryInterface.changeColumn('user_subscriptions', "segnature_id", {
      type: Sequelize.TEXT
    });
    await queryInterface.changeColumn('user_subscriptions', "payment_id", {
      type: Sequelize.TEXT
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.changeColumn('user_subscriptions', "order_id", {
      type: Sequelize.INTEGER
    });
    await queryInterface.changeColumn('user_subscriptions', "segnature_id", {
      type: Sequelize.INTEGER
    });
    await queryInterface.changeColumn('user_subscriptions', "payment_id", {
      type: Sequelize.INTEGER
    });
  }
};
