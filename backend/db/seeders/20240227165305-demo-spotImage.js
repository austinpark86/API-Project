'use strict';
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
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
			spotId: 1,
			url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdBRPK3vNYbKwi_56hJc2AUS-BX-bvujpAaQ&usqp=CAU",
			preview: true,
		},
		{
			spotId: 1,
			url: "https://media.istockphoto.com/id/1469440047/photo/modern-living-interior.jpg?s=612x612&w=0&k=20&c=ccpjQCnWvzLa4ynGgfOVaGMt_EY6bVA5-oJtRIjeTPY=",
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
			spotId: 2,
			url: "https://kidsactivitiesblog.com/wp-content/uploads/2020/08/house3.jpg",
			preview: true,
		},
		{
			spotId: 2,
			url: "https://static.boredpanda.com/blog/wp-content/uploads/2020/07/tiny-assembled-five-room-house-from-amazon-5f1ad4b91605e__700.jpg",
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
		{
			spotId: 3,
			url: "https://c8.alamy.com/comp/CC381T/view-of-the-mud-house-guest-house-in-the-faran-settlement-located-CC381T.jpg",
			preview: true,
		},
		{
			spotId: 3,
			url: "https://www.shutterstock.com/image-photo/traditional-ancient-arab-mud-house-260nw-1273677094.jpg",
			preview: true,
		},
		{
			spotId: 4,
			url: "https://www.shutterstock.com/shutterstock/videos/23220622/thumb/1.jpg?ip=x480",
			preview: true,
		},
		{
			spotId: 4,
			url: "https://media.gettyimages.com/id/466336640/photo/basketball-arena.jpg?s=612x612&w=gi&k=20&c=c7rTy7SQPHF39fdSUsfnBUpxbrTjOAEW2RgSFTxFJFQ=",
			preview: true,
		},
		{
			spotId: 4,
			url: "https://www.soundandcommunications.com/wp-content/uploads/2020/12/AVIXA-POV.png",
			preview: true,
		},
		{
			spotId: 4,
			url: "https://media.gettyimages.com/id/1452757541/photo/detroit-michigan-a-wilson-brand-official-game-ball-basketball-is-pictured-with-the-nba-logo.jpg?s=612x612&w=gi&k=20&c=8M49gDnZwqXkw1aLtaxOhUFqa0LQqnapZOWkt0-yVOk=",
			preview: true,
		},
		{
			spotId: 4,
			url: "https://media.istockphoto.com/id/1212807636/photo/view-of-basketball-court.jpg?s=612x612&w=0&k=20&c=639_Vm1A8fnKtcBi6rR6s4keCZcP5LvVIDASIgIkMW8=",
			preview: true,
		},
		{
			spotId: 5,
			url: "https://media.istockphoto.com/id/612403380/photo/beach-house-interior-at-seashore.jpg?s=612x612&w=0&k=20&c=3m1SC_kA4kHBSFbYeIDvVX4jiOl5M8UGdsVai3-SP58=",
			preview: true,
		},
		{
			spotId: 5,
			url: "https://media.architecturaldigest.com/photos/6410bb0291526c92b3c540ef/16:9/w_2560%2Cc_limit/3%2520(1).jpg",
			preview: true,
		},
		{
			spotId: 5,
			url: "https://darcihether.com/wp-content/uploads/2018/02/HoyeExt.31aS.jpg",
			preview: true,
		},
		{
			spotId: 5,
			url: "https://cdn.vox-cdn.com/thumbor/HrE0u4sWCMc1EIMIrCtc-VTBtgM=/0x0:980x500/1200x0/filters:focal(0x0:980x500):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8811159/malibu1.jpg",
			preview: true,
		},
		{
			spotId: 5,
			url: "https://www.eichlerforsale.com/uploads/shared/images/la20152.jpg",
			preview: true,
		},
		{
			spotId: 6,
			url: "https://c8.alamy.com/comp/DR53CM/a-young-inuit-sits-on-a-bed-in-an-igloo-surrounded-by-other-necessary-DR53CM.jpg",
			preview: true,
		},
		{
			spotId: 6,
			url: "https://qph.cf2.quoracdn.net/main-qimg-4ac4f628974e999725754abb2ee066ab-lq",
			preview: true,
		},
		{
			spotId: 6,
			url: "https://content.cdntwrk.com/files/aHViPTg3NzMxJmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzYzYmVlYmZlODUwYzguanBnJnZlcnNpb249MDAwMCZzaWc9OWFmMmUxNjViYWUyZDNlNzllMzhjOTkwMGQ0NjNkNTk%253D",
			preview: true,
		},
		{
			spotId: 6,
			url: "https://t3.ftcdn.net/jpg/01/36/61/86/360_F_136618627_KSNBf0kPNxTRTIqzrCDleKj1a4qIyHp8.jpg",
			preview: true,
		},
		{
			spotId: 6,
			url: "https://www.transun.co.uk/DynamicImages/960e/960eef2cf1336d0d3488c7598e10193d_944_629.jpg",
			preview: true,
		},
		{
			spotId: 7,
			url: "https://i.pinimg.com/736x/d9/dd/fa/d9ddfaaeff8a11ce208f842b31d07274.jpg",
			preview: true,
		},
		{
			spotId: 7,
			url: "https://www.thesun.co.uk/wp-content/uploads/2017/01/nintchdbpict000296961102.jpg",
			preview: true,
		},
		{
			spotId: 7,
			url: "https://i.pinimg.com/736x/e7/37/b8/e737b8ce6dc795d1862d1ae95cbc065f.jpg",
			preview: true,
		},
		{
			spotId: 7,
			url: "https://cdn.decoist.com/wp-content/uploads/2013/02/Cozy-interior-of-a-woodland-home.jpg",
			preview: true,
		},
		{
			spotId: 7,
			url: "https://sanitred.com/wp-content/uploads/2015/07/what-is-an-underground-home-1.jpg",
			preview: true,
		},
		{
			spotId: 8,
			url: "https://www.zocalopublicsquare.org/wp-content/uploads/2020/01/Petchler-Sewers-Glimpse-p182.jpg",
			preview: true,
		},
		{
			spotId: 8,
			url: "https://www.shutterstock.com/image-photo/exit-drainage-sewage-tunnel-pipe-260nw-1033454413.jpg",
			preview: true,
		},
		{
			spotId: 8,
			url: "https://static.politico.com/41/35/72200acb4f8a82f4e5286005085c/lede.jpg",
			preview: true,
		},
		{
			spotId: 8,
			url: "https://t4.ftcdn.net/jpg/03/13/07/71/360_F_313077120_SathFxwu3Nk66bkndmy4nXzxV16Icaiu.jpg",
			preview: true,
		},
		{
			spotId: 8,
			url: "https://static.scientificamerican.com/sciam/cache/file/F3873DA8-F161-4EBA-B31E185569909A84.jpg?w=590&h=393",
			preview: true,
		},
		{
			spotId: 9,
			url: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/G5N76XQOR4I63CHIYWG4HW5O4I.jpg&w=1440",
			preview: true,
		},
		{
			spotId: 9,
			url: "https://people.com/thmb/80qeJAedV_CJL9rTXgoVlgL39ME=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(949x0:951x2)/WH-interior-6-ecde2399329049c19d62bd2b6aa48c40.jpg",
			preview: true,
		},
		{
			spotId: 9,
			url: "https://media.cnn.com/api/v1/images/stellar/prod/201027111633-05-obama-white-house-interiors.jpg?q=w_2500,h_1669,x_0,y_0,c_fill",
			preview: true,
		},
		{
			spotId: 9,
			url: "https://i.insider.com/6036a604d920880018591d45?width=1136&format=jpeg",
			preview: true,
		},
		{
			spotId: 9,
			url: "https://media.cnn.com/api/v1/images/stellar/prod/201027111636-02-obama-white-house-interiors.jpg?q=w_4330,h_2890,x_0,y_0,c_fill",
			preview: true,
		},
	])
	},

	async down(queryInterface, Sequelize) {
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
				spotId: { [Op.in]: [1, 2, 3] },
			},
			{}
		);
	}
};
