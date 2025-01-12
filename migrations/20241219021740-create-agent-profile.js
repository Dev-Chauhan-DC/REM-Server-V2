'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('agent_profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      background: {
        type: Sequelize.INTEGER
      },
      avatar: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      experience_year: {
        type: Sequelize.INTEGER
      },
      employee_size: {
        type: Sequelize.INTEGER
      },
      website_link: {
        type: Sequelize.STRING
      },
      facebook_link: {
        type: Sequelize.STRING
      },
      instagram_link: {
        type: Sequelize.STRING
      },
      linkedin_link: {
        type: Sequelize.STRING
      },
      youtube_link: {
        type: Sequelize.STRING
      },
      contact_number: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('agent_profiles');
  }
};