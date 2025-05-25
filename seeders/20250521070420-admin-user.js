'use strict';
require('dotenv').config();
const userServices = require('../services/userServices')
const { RolesEnum } = require('../middleware/middleware')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    try {
      const user = await userServices.findOne({
        where: {
          phone_number: process.env.ADMIN_NUMBER
        }
      })

      if (user) {
        await userServices.update(
          {
            user_roles_id: RolesEnum.admin
          },
          {
            where: {
              phone_number: process.env.ADMIN_NUMBER
            }
          }
        )
      }

      if (!user) {
        await userServices.create({
          phone_number: process.env.ADMIN_NUMBER,
          user_roles_id: RolesEnum.admin
        })
      }
    } catch (error) {
      console.error(error)
    }


  },

  async down(queryInterface, Sequelize) {
    try {
      await userServices.destroy({
        where: {
          phone_number: process.env.ADMIN_NUMBER
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
};
