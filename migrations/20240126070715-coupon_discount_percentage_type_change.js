'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.changeColumn('coupons', "discount_percentage", {
      type: Sequelize.INTEGER
    });

  },

  async down(queryInterface, Sequelize) {
  
    await queryInterface.changeColumn('coupons', "discount_percentage", {
      type: Sequelize.INTEGER
    });
     
  }
};
