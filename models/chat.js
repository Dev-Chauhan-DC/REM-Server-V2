'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chat.init({
    conversation_id: DataTypes.INTEGER,
    sender_id: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    is_read: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'chat',
  });
  return chat;
};