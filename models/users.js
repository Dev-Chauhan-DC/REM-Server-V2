'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.interested_peoples, {
        foreignKey: 'users_id'
      })

      users.hasMany(models.properties, {
        foreignKey: 'user_id'
      })

      users.hasMany(models.saved_properties, {
        foreignKey: 'user_id'
      })

      users.belongsTo(models.user_roles, {
        foreignKey: 'user_roles_id'
      })

      users.hasMany(models.user_subscriptions, {
        foreignKey: 'user_id'
      })

      users.hasMany(models.conversation, {
        foreignKey: 'user1_id',
      });

      users.hasMany(models.conversation, {
        foreignKey: 'user2_id',
      });

    }
  }
  users.init({
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    user_roles_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    secondary_number: DataTypes.STRING,
    aadhaar_number: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    password: DataTypes.TEXT,
    agency_name: DataTypes.STRING,
    company_name: DataTypes.STRING,
    is_subscription_active: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};