'use strict';
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage,{
        foreignKey:'reviewId',
        onDelete:'CASCADE',
        hooks:true,
      })
      Review.belongsTo(models.Spot,{
        foreignKey:'spotId'
      });
      Review.belongsTo(models.User,{
        foreignKey:'userId'
      });

    }
  }
  Review.init({
			spotId: {
				type: DataTypes.INTEGER,
				references: { model: "Spot", key: "id" },
			},
			userId: {
				type: DataTypes.INTEGER,
				references: { model: "User", key: "id" },
			},
			review: DataTypes.TEXT,
			stars: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Review",
		}
	);
	return Review;
};
