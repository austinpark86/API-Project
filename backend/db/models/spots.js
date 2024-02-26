'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spots.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' });
      spots.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      spots.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true,
      });
      spots.hasMany(models.Bookings, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }

  spots.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        references: { model: 'User', key: 'id' },
      },
      address: DataTypes.TEXT,
      city: DataTypes.TEXT,
      state: DataTypes.TEXT,
      country: DataTypes.TEXT,
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL,
      name: DataTypes.TEXT,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'spots',
    }
  );
  return spots;
};