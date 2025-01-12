'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class agent_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      agent_profile.hasMany(models.properties, {
        foreignKey: 'agent_id'
      })
    }
  }
  agent_profile.init({
    background: DataTypes.INTEGER,
    avatar: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    experience_year: DataTypes.INTEGER,
    employee_size: DataTypes.INTEGER,
    website_link: DataTypes.STRING,
    facebook_link: DataTypes.STRING,
    instagram_link: DataTypes.STRING,
    linkedin_link: DataTypes.STRING,
    youtube_link: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    about: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'agent_profile',
  });
  return agent_profile;
};