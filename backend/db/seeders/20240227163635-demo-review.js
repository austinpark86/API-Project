'use strict';
const { Review, Sequelize } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  	await Review.bulkCreate([
			{
				spotId: 1,
				userId: 2,
				review:
					"This place is humongous no wonder its a mansion",
				stars: 5,
			},
			{
				spotId: 2,
				userId: 1,
				review: "It's a cardboard box...",
				stars: 1,
			},
			{
				spotId: 3,
				userId: 2,
				review:
					"You know for a mudhouse it ain't so bad",
				stars: 3,
			},
    ])},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op=Sequelize.Op
    options.tableName = "Reviews";

    return queryInterface.bulkDelete(
			options,
			{
				spotId: { [Op.in]: [1, 2, 3] },
			},
			{}
		);
  }
};
