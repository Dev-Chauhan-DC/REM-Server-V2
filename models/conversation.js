'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      conversation.belongsTo(models.users, {
        foreignKey: 'user1_id',
        as: 'user1'
      });

      conversation.belongsTo(models.users, {
        foreignKey: 'user2_id',
        as: 'user2'
      });



    }
  }
  conversation.init({
    user1_id: DataTypes.INTEGER,
    user2_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'conversation',
  });
  return conversation;
};