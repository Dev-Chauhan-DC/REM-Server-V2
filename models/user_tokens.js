'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_tokens.init({
    user_id: DataTypes.INTEGER,
    property_listing_plan_id: DataTypes.INTEGER,
    is_used: DataTypes.TINYINT,
    order_id: DataTypes.TEXT,
    signature: DataTypes.TEXT,
    payment_id: DataTypes.TEXT,
    paid_amount: DataTypes.DOUBLE,
    coupon_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_tokens',
  });
  return user_tokens;
};