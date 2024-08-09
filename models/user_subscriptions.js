'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_subscriptions.belongsTo(models.users,{
        foreignKey: 'user_id'
      })
    }
  }
  user_subscriptions.init({
    user_id: DataTypes.INTEGER,
    plan_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    order_id: DataTypes.TEXT,
    segnature_id: DataTypes.TEXT,
    payment_id: DataTypes.TEXT,
    paid_amount: DataTypes.DOUBLE,
    coupon_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user_subscriptions',
  });
  return user_subscriptions;
};