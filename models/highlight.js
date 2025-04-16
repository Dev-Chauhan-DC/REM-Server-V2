'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class highlight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      highlight.hasMany(models.property_highlight, {
        foreignKey: 'highlight_id'
      })
    }
  }
  highlight.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'highlight',
  });
  return highlight;
};