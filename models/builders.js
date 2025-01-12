'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class builders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      builders.hasMany(models.properties, {
        foreignKey: 'builder_id'
      })
      // define association here
    }
  }
  builders.init({
    background: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    avatar: DataTypes.INTEGER,
    name: DataTypes.STRING,
    founded_date: DataTypes.DATE,
    employee_size: DataTypes.INTEGER,
    website_link: DataTypes.STRING,
    facebook_link: DataTypes.STRING,
    instagram_link: DataTypes.STRING,
    linkedin_link: DataTypes.STRING,
    youtube_link: DataTypes.STRING,
    about: DataTypes.TEXT,
    project_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'builders',
  });
  return builders;
};