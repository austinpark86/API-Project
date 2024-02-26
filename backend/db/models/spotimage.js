'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spotimage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spotimage.belongsTo(models.Spots,{
        foreignKey:'spotId'
      })
    }
  }
  spotimage.init({
    spotId: DataTypes.INTEGER,
			url: DataTypes.TEXT,
			preview: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "spotimage",
		}
	);
	return spotimage;
};
