"use strict";
const { User } = require("../models");
const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await Spot.bulkCreate([
    {
      ownerId: 1,
      name: "Super Big Mansion",
      description:
        "This house is really big",
      address: "Top of the hill",
      city: "Medina",
      state: "Washington",
      country: "United States",
      lat: 12.34,
      lng: -43.21,
      price: 1000,
    },
    {
      ownerId: 2,
      name: "Small House",
      description:
        "what can I say its small",
      address: "Cardboard Box",
      city: "Slum",
      state: "Slum State",
      country: "Slum Country",
      lat: 31.415,
      lng: 91.67,
      price: 10,
    },
    {
      ownerId: 3,
      name: "Dirty House",
      description:
        "Its just a mudhouse",
      address: "In the jungle",
      city: "Across from the big tree",
      state: "In the area with Big trees",
      country: "Amazon Country",
      lat: 15.22,
      lng: -111.11,
      price: 50,
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op=Sequelize.Op
		return queryInterface.bulkDelete(
			options,
			{
				name: { [Op.in]: ["Super Big Mansion", "Small House", "Dirty House"] },
			},
			{}
		);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
