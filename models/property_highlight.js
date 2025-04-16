'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property_highlight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      property_highlight.belongsTo(models.properties, {
        foreignKey: 'property_id'
      })

      property_highlight.belongsTo(models.highlight, {
        foreignKey: 'highlight_id'
      })

    }
  }
  property_highlight.init({
    property_id: DataTypes.INTEGER,
    highlight_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'property_highlight',
  });
  return property_highlight;
};