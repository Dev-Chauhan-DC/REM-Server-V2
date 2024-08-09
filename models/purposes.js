'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purposes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      purposes.hasMany(models.properties,{
        foreignKey: 'purpose_id'
      })

    }
  }
  purposes.init({
    purpose: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'purposes',
  });
  return purposes;
};