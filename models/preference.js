'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class preference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      preference.hasMany(models.property_preference, {
        foreignKey: 'preference_id'
      })
    }
  }
  preference.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'preference',
  });
  return preference;
};