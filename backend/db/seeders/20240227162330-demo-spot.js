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
    {
      ownerId: 4,
      name: "NBA",
      description:
        "Its the NBA court",
      address: "In the NBA Stadium",
      city: "All Cities",
      state: "Almost all States",
      country: "United States",
      lat: 18.22,
      lng: -222.22,
      price: 100,
    },
    {
      ownerId: 5,
      name: "Beach House",
      description:
        "Its a sandcastle",
      address: "On the Beach",
      city: "Los Angeles",
      state: "California",
      country: "United States",
      lat: 12.22,
      lng: 12.12,
      price: 300,
    },
    {
      ownerId: 6,
      name: "Igloo",
      description:
        "Its a house made out of ice",
      address: "In Antartica",
      city: "Northern Antartica",
      state: "Antartica State",
      country: "Antartica",
      lat: 100.11,
      lng: 1.11,
      price: 150,
    },
    {
      ownerId: 7,
      name: "Hole in the ground",
      description:
        "Its a hole",
      address: "Underground",
      city: "Unknown",
      state: "Unknown",
      country: "Egypt",
      lat: 142.22,
      lng: -124.22,
      price: 25,
    },
    {
      ownerId: 8,
      name: "Sewer tunnel",
      description:
        "It stinks in here",
      address: "Under Vegas",
      city: "Las Vegas",
      state: "Nevada",
      country: "United States",
      lat: 100.22,
      lng: -100.22,
      price: 10,
    },
    {
      ownerId: 9,
      name: "White House",
      description:
        "Sleep in the Oval Office",
      address: "1600 Pennsylvania Lane",
      city: "Top Secret",
      state: "Top Secret",
      country: "United States",
      lat: 100.00,
      lng: -100.00,
      price: 1050,
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
