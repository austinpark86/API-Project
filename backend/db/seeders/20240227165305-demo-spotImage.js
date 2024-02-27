'use strict';
const { SpotImage } = require("../models");
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
    */await SpotImage.bulkCreate([
      {
				spotId: 1,
				url: "https://media.istockphoto.com/id/154952872/photo/contemporary-island-villa.jpg?s=612x612&w=0&k=20&c=s_hHCWCofvWaar-NjSTPbCDFtUkEB6AFGCY4U9Xz2RQ=",
				preview: true,
			},
			{
				spotId: 1,
				url: "https://s.wsj.net/public/resources/images/BN-TV864_MANSIO_M_20170613154128.jpg",
				preview: true,
			},
			{
				spotId: 1,
				url: "https://i.pinimg.com/736x/7c/19/3c/7c193c9f1bf72b6518371d76d5ac782d.jpg",
				preview: true,
			},
      {
				spotId: 2,
				url: "https://media.cnn.com/api/v1/images/stellar/prod/161122141134-wikkelhouse-2.jpg?q=w_4134,h_2843,x_0,y_0,c_fill/h_778",
				preview: true,
			},
			{
				spotId: 2,
				url: "https://media.cnn.com/api/v1/images/stellar/prod/161122141158-wikkelhouse-3.jpg?q=w_4134,h_2620,x_0,y_0,c_fill",
				preview: true,
			},
			{
				spotId: 2,
				url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTblppk6uKYz2nyLwAbvgEWksZTbQ-QUWQYvQ&usqp=CAU",
				preview: true,
			},
      {
				spotId: 3,
				url: "https://www.urbunhut.com/image/Hut8.jpg",
				preview: true,
			},
			{
				spotId: 3,
				url: "https://www.quailsprings.org/wp-content/uploads/2019/11/juna-mud-house-4.jpg",
				preview: true,
			},
			{
				spotId: 3,
				url: "https://i.ytimg.com/vi/EHfq0miBu8c/maxresdefault.jpg",
				preview: true,
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
    options.tableName = "SpotImages";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				spotId: { [Op.in]: [1,2,3] },
			},
			{}
		);
  }
};
