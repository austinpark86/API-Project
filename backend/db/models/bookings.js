'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookings.belongsTo(models.Spots,{
          foreignKey:'spotsId',
      });
      bookings.belongsTo(models.User,{
        foreignKey:'userId'
      })
    }
  }
  bookings.init({
    spotId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			startDate: { type: DataTypes.DATE, allowNull: false },
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isAfterStart() {
						if (this.endDate < this.startDate) {
							throw new Error("End date must be after the start date");
						}
					},
				},
			},
		},
		{
			sequelize,
			modelName: "bookings",
		}
	);
	return bookings;
};
