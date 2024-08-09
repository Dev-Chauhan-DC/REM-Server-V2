'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      property_listing_plan_id: {
        type: Sequelize.INTEGER
      },
      is_used: {
        type: Sequelize.TINYINT
      },
      order_id: {
        type: Sequelize.TEXT
      },
      signature: {
        type: Sequelize.TEXT
      },
      payment_id: {
        type: Sequelize.TEXT
      },
      paid_amount: {
        type: Sequelize.DOUBLE
      },
      coupon_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_tokens');
  }
};