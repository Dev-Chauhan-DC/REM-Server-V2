'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      purpose_id: {
        type: Sequelize.INTEGER
      },
      home_types_id: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.TEXT
      },
      landmark: {
        type: Sequelize.TEXT
      },
      area: {
        type: Sequelize.TEXT
      },
      pincode: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      bedroom_count: {
        type: Sequelize.INTEGER
      },
      bathroom_count: {
        type: Sequelize.INTEGER
      },
      hall_count: {
        type: Sequelize.INTEGER
      },
      kitchen_count: {
        type: Sequelize.INTEGER
      },
      balcony_count: {
        type: Sequelize.INTEGER
      },
      built_up_area: {
        type: Sequelize.DOUBLE
      },
      carpet_area: {
        type: Sequelize.DOUBLE
      },
      plot_area: {
        type: Sequelize.DOUBLE
      },
      facing_id: {
        type: Sequelize.INTEGER
      },
      property_age: {
        type: Sequelize.DOUBLE
      },
      total_floor: {
        type: Sequelize.DOUBLE
      },
      property_floor: {
        type: Sequelize.DOUBLE
      },
      flooring_types_id: {
        type: Sequelize.INTEGER
      },
      ownership_types_id: {
        type: Sequelize.INTEGER
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      price: {
        type: Sequelize.DOUBLE
      },
      negotiable: {
        type: Sequelize.BOOLEAN
      },
      maintenance: {
        type: Sequelize.DOUBLE
      },
      currently_under_loan: {
        type: Sequelize.BOOLEAN
      },
      availability_types_id: {
        type: Sequelize.INTEGER
      },
      furnishings_id: {
        type: Sequelize.INTEGER
      },
      parking_slot_two_wheeler_count: {
        type: Sequelize.INTEGER
      },
      parking_slot_four_wheeler_count: {
        type: Sequelize.INTEGER
      },
      cupboard: {
        type: Sequelize.INTEGER
      },
      kitchen_types_id: {
        type: Sequelize.INTEGER
      },
      property_description: {
        type: Sequelize.TEXT
      },
      gated_security: {
        type: Sequelize.BOOLEAN
      },
      gym: {
        type: Sequelize.BOOLEAN
      },
      water_supplies_id: {
        type: Sequelize.INTEGER
      },
      power_backups_id: {
        type: Sequelize.INTEGER
      },
      corner_property: {
        type: Sequelize.BOOLEAN
      },
      verified_property: {
        type: Sequelize.BOOLEAN
      },
      agent_certification: {
        type: Sequelize.BOOLEAN
      },
      possessions_id: {
        type: Sequelize.INTEGER
      },
      flats_in_building: {
        type: Sequelize.INTEGER
      },
      deposit: {
        type: Sequelize.DOUBLE
      },
      tenants_id: {
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
    await queryInterface.dropTable('properties');
  }
};