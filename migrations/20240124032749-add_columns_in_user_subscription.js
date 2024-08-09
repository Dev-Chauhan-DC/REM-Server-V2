'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('user_subscriptions', "order_id", {
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('user_subscriptions', "segnature_id", {
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('user_subscriptions', "payment_id", {
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('user_subscriptions', "paid_amount", {
      type: Sequelize.DOUBLE
    });
    await queryInterface.addColumn('user_subscriptions', "coupon_id", {
      type: Sequelize.INTEGER
    });
    
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('user_subscriptions', "order_id");
    await queryInterface.removeColumn('user_subscriptions', "segnature_id");
    await queryInterface.removeColumn('user_subscriptions', "payment_id");
    await queryInterface.removeColumn('user_subscriptions', "paid_amount");
    await queryInterface.removeColumn('user_subscriptions', "coupon_id");

  }
};
