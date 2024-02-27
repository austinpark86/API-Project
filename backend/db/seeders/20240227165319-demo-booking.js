'use strict';
const { Booking } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-05"),
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date("2024-01-06"),
        endDate: new Date("2024-01-07"),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date("2024-01-08"),
        endDate: new Date("2024-01-11"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },

};
