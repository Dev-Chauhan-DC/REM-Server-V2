'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      properties.hasMany(models.property_amenities,{
        foreignKey: 'properties_id'
      })

      properties.hasMany(models.property_photos,{
        foreignKey: 'properties_id'
      })

      properties.hasMany(models.interested_peoples,{
        foreignKey: 'properties_id'
      })

      properties.hasMany(models.saved_properties,{
        foreignKey: 'property_id'
      })

      properties.belongsTo(models.purposes,{
        foreignKey: 'purpose_id'
      })

      properties.belongsTo(models.home_types,{
        foreignKey: 'home_types_id'
      })

      properties.belongsTo(models.facings,{
        foreignKey: 'facing_id'
      })

      properties.belongsTo(models.flooring_types,{
        foreignKey: 'flooring_types_id'
      })

      properties.belongsTo(models.ownership_types,{
        foreignKey: 'ownership_types_id'
      })

      properties.belongsTo(models.availability_types,{
        foreignKey: 'availability_types_id'
      })

      properties.belongsTo(models.furnishings,{
        foreignKey: 'furnishings_id'
      })

      properties.belongsTo(models.kitchen_types,{
        foreignKey: 'kitchen_types_id'
      })

      properties.belongsTo(models.water_supplies,{
        foreignKey: 'water_supplies_id'
      })

      properties.belongsTo(models.power_backups,{
        foreignKey: 'power_backups_id'
      })

      properties.belongsTo(models.possessions,{
        foreignKey: 'possessions_id'
      })

      properties.belongsTo(models.tenants,{
        foreignKey: 'tenants_id'
      })

      properties.belongsTo(models.users,{
        foreignKey: 'user_id'
      })



    }
  }
  properties.init({
    user_id: DataTypes.INTEGER,
    purpose_id: DataTypes.INTEGER,
    home_types_id: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    landmark: DataTypes.TEXT,
    area: DataTypes.TEXT,
    pincode: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    bedroom_count: DataTypes.INTEGER,
    bathroom_count: DataTypes.INTEGER,
    hall_count: DataTypes.INTEGER,
    kitchen_count: DataTypes.INTEGER,
    balcony_count: DataTypes.INTEGER,
    built_up_area: DataTypes.DOUBLE,
    carpet_area: DataTypes.DOUBLE,
    plot_area: DataTypes.DOUBLE,
    facing_id: DataTypes.INTEGER,
    property_age: DataTypes.DOUBLE,
    total_floor: DataTypes.DOUBLE,
    property_floor: DataTypes.DOUBLE,
    flooring_types_id: DataTypes.INTEGER,
    ownership_types_id: DataTypes.INTEGER,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    negotiable: DataTypes.BOOLEAN,
    maintenance: DataTypes.DOUBLE,
    currently_under_loan: DataTypes.BOOLEAN,
    availability_types_id: DataTypes.INTEGER,
    furnishings_id: DataTypes.INTEGER,
    parking_slot_two_wheeler_count: DataTypes.INTEGER,
    parking_slot_four_wheeler_count: DataTypes.INTEGER,
    cupboard: DataTypes.INTEGER,
    kitchen_types_id: DataTypes.INTEGER,
    property_description: DataTypes.TEXT,
    gated_security: DataTypes.BOOLEAN,
    gym: DataTypes.BOOLEAN,
    water_supplies_id: DataTypes.INTEGER,
    power_backups_id: DataTypes.INTEGER,
    corner_property: DataTypes.BOOLEAN,
    verified_property: DataTypes.BOOLEAN,
    agent_certification: DataTypes.BOOLEAN,
    possessions_id: DataTypes.INTEGER,
    flats_in_building: DataTypes.INTEGER,
    deposit: DataTypes.DOUBLE,
    tenants_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'properties',
  });
  return properties;
};