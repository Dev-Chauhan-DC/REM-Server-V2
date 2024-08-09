'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class availability_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      availability_types.hasMany(models.properties,{
        foreignKey: 'availability_types_id'
      })

    }
  }
  availability_types.init({
    availability_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'availability_types',
  });
  return availability_types;
};