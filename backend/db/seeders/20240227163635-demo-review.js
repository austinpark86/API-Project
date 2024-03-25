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
			{
				spotId: 4,
				userId: 5,
				review:
					"Hardwood floors for a bed",
				stars: 2,
			},
			{
				spotId: 5,
				userId: 4,
				review:
					"Peaceful",
				stars: 5,
			},
			{
				spotId: 6,
				userId: 2,
				review:
					"Its Cold",
				stars: 3,
			},
			{
				spotId: 7,
				userId: 1,
				review:
					"I cant see",
				stars: 2,
			},
			{
				spotId: 8,
				userId: 6,
				review:
					"Stinks in here",
				stars: 1,
			},
			{
				spotId: 9,
				userId: 5,
				review:
					"Im not allowed to say",
				stars: 5,
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
