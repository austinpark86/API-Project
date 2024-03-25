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
    {
      reviewId: 4,
      url: "https://cdn.nba.com/manage/2020/10/2020-finals-court-2-784x527.jpg",
    },
    {
      reviewId: 5,
      url: "https://thecottagejournal.com/wp-content/uploads/2022/06/TheCottageJournal_Exterior-1.jpg",
    },
    {
      reviewId: 6,
      url: "https://cdn.outsideonline.com/wp-content/uploads/migrated-images_parent/migrated-images_78/igloo-real-tools_s.jpg",
    },
    {
      reviewId: 7,
      url: "https://t4.ftcdn.net/jpg/05/79/80/23/360_F_579802317_tx5U5aJ0J9tn1ufYcJV9hDL7c6FNZlgi.jpg",
    },
    {
      reviewId: 8,
      url: "https://img.atlasobscura.com/EOA7QXVrkoHt6eQ0XvceM-eZVMWgHd5fX25NTQQwe68/rs:fill:780:520:1/g:ce/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy84MTZk/YzdjNjhiNzg1OWE4/ZGEyOWZhNDUyYjRl/ZWNmNTA2NDRkMTMz/LmpwZw.jpg",
    },
    {
      reviewId: 9,
      url: "https://media.architecturaldigest.com/photos/6559735fb796d428bef00d25/16:9/w_2560%2Cc_limit/GettyImages-1731443210.jpg",
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
