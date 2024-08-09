'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tenants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tenants.hasMany(models.properties,{
        foreignKey: 'tenants_id'
      })

    }
  }
  tenants.init({
    tenant: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tenants',
  });
  return tenants;
};