'use strict';
const { ReviewImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await ReviewImage.bulkCreate([
    {
      reviewId: 1,
      url: "https://www.palmbeachpost.com/gcdn/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?width=1200&disable=upscale&format=pjpg&auto=webp",
    },
    {
      reviewId: 2,
      url: "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/how-to-build-a-cardboard-box-playhouse-step-6.jpg",
    },
    {
      reviewId: 3,
      url: "https://i.ytimg.com/vi/EHfq0miBu8c/hqdefault.jpg",
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "ReviewImages";
		const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
			options,
			{
				reviewId: { [Op.in]: [1, 2, 3] },
			},
			{}
		);
  }
};
