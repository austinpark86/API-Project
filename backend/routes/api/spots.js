const express = require("express");
const { Sequelize } = require("sequelize");
const {
	Spot,
	SpotImage,
	Review,
	User,
	ReviewImage,
	Booking,
} = require("../../db/models");
const {
	setTokenCookie,
	restoreUser,
	requireAuth,
} = require("../../utils/auth");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { check, query } = require("express-validator");
const router = express.Router();
const { handleValidationErrors, spotChecker, getAllSpots, doesSpotExist, validateDates, validatePost, validateQueryFilters, validateReview,isOwner } = require("../../utils/validation");


//create a spot
router.post("/", [requireAuth, validatePost], async (req, res) => {
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;

	const ownerId = req.user.id;

	const spot = await Spot.create({
		ownerId,
		address,
		city,
		state,
		country,
		lat: parseFloat(lat),
		lng: parseFloat(lng),
		name,
		description,
		price: parseFloat(price),
	});

	return res.status(201).json(spot);
});

//get all spots
router.get("/", validateQueryFilters, async (req, res) => {
	let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
		req.query;

	const paginationObj = {
		where: {},
	};

	if (!page) page = 1;
	if (!size) size = 20;
	if (page > 10) page = 10;
	if (size > 30) size = 30;

	paginationObj.page = size;
	paginationObj.size = size * (page - 1);

	if (parseInt(size) <= 0 || page <= 0) {
		delete paginationObj.page;
		delete paginationObj.size;
	}

	if (minPrice < 0) minPrice = 0;
	if (maxPrice < 0) maxPrice = 0;

	if (minPrice) {
		paginationObj.where.price = { [Op.gte]: minPrice };
	}

	if (maxPrice) {
		paginationObj.where.price = { [Op.lte]: maxPrice };
	}
	if (minPrice && maxPrice) {
		paginationObj.where.price = { [Op.between]: [minPrice, maxPrice] };
	}

	if (minLat) {
		paginationObj.where.lat = { [Op.gte]: minLat };
	}

	if (maxLat) {
		paginationObj.where.lat = { [Op.lte]: maxLat };
	}

	if (minLat && maxLat) {
		paginationObj.where.lat = { [Op.between]: [minLat, maxLat] };
	}

	if (minLng) {
		paginationObj.where.lng = { [Op.gte]: minLng };
	}

	if (maxLng) {
		paginationObj.where.lng = { [Op.lte]: maxLng };
	}

	if (minLng && maxLng) {
		paginationObj.where.lng = { [Op.between]: [minLng, maxLng] };
	}


	const Spots = await Spot.findAll({});
	let rating;

	for (let i = 0; i < Spots.length; i++) {
		let numReviews = await Review.count({
			where: {
				spotId: Spots[i].id,
			},
		});
		let numStars = await Review.sum("numStars", {
			where: {
				spotId: Spots[i].id,
			},
		});

		if (!numStars) rating = 0;
		else {
			rating = numStars / numReviews;
		}

		Spots[i].setDataValue("rating", rating);

		const imageUrl = await SpotImage.findOne({
			where: {
				spotId: Spots[i].id,
			},
		});

		if (!imageUrl) {
			Spots[i].setDataValue("previewImage", null);
		} else {
			Spots[i].setDataValue("previewImage", imageUrl.url);
		}

		if (Spots[i].lat) {
			Spots[i].setDataValue("lat", parseFloat(Spots[i].lat));
		}
		if (Spots[i].lng) {
			Spots[i].setDataValue("lng", parseFloat(Spots[i].lng));
		}
		if (Spots[i].price) {
			Spots[i].setDataValue("price", parseFloat(Spots[i].price));
		}
	}
	res.json({ Spots, page: parseInt(page), size: parseInt(size) });
});

//get spots by current user
router.get('/current', requireAuth, async (req, res) => {

	const user = req.user;
	const ownerSpots = await Spot.findAll({
		where: {
			ownerId: user.id
		}
	});

	const spots = await getAllSpots(ownerSpots);

	return res.json({ Spots: spots });

})
//get spots information from id
router.get("/:spotId", doesSpotExist, async (req, res) => {
	const { spotId } = req.params;


	let spotInfo = await Spot.findByPk(spotId, {
		include: [
			{
				model: Review,
				attributes: ['stars']
			},
			{
				model: SpotImage,
				attributes: ['id', 'url', 'preview']
			},
			{
				model: User,
				attributes: ['id', 'firstName', 'lastName']
			}
		]
	});

	spotInfo = spotInfo.toJSON();

	let reviewTotal = 0;
	let stars = 0;
	for (let review of spotInfo.Reviews) {
		reviewTotal++;
		stars += review.stars
	}

	spotInfo.Owner = spotInfo.User;
	spotInfo.reviewTotal = reviewTotal;
	spotInfo.avgStarRating = Number((stars / reviewTotal).toFixed(1));
	delete spotInfo.User;
	delete spotInfo.Reviews;

	return res.json(spotInfo);
})

//add an image to a spot from its id
router.post("/:spotId/images", requireAuth, doesSpotExist,isOwner, async (req, res) => {
	const { url, preview } = req.body;

	const { spotId } = req.params;


	await SpotImage.create({ spotId, url, preview });

	const findNewSpot = await SpotImage.findOne({
		where: {
			url: url,
		},
		attributes: {
			exclude: ["createdAt", "updatedAt", "spotId"],
		},
	});

	res.json(findNewSpot);
});

//edit a spot
router.put("/:spotId", requireAuth, validatePost, doesSpotExist,isOwner, async (req, res) => {
	const { address, city, state, country, lat, lng, name, description, price } = req.body;
	const { spotId } = req.params;

	const spot = await Spot.findByPk(spotId);

	spot.address = address || spot.address;
	spot.city = city || spot.city;
	spot.state = state || spot.state;
	spot.country = country || spot.country;
	spot.lat = lat || spot.lat;
	spot.lng = lng || spot.lng;
	spot.name = name || spot.name;
	spot.description = description || spot.description;
	spot.price = price || spot.price;

	await spot.save();

	res.json(spot);
});
//delete a spot
router.delete("/:spotId", requireAuth,doesSpotExist, isOwner,async (req, res) => {
	const { spotId } = req.params;

	const spot = await Spot.findByPk(spotId);

	await spot.destroy();
	return res.json({
		message: "Successfully deleted",
	});
});

// get all reviews by a spotid
router.get("/:spotId/reviews", doesSpotExist, async (req, res) => {
	const { spotId } = req.params;

	const reviews = await Review.findAll({
	  where: { spotId: spotId },
	  include: [
		{
		  model: User,
		  attributes: ['id', 'firstName', 'lastName']
		},
		{
		  model: ReviewImage,
		  attributes: ['id', 'url']
		}
	  ]
	});

	return res.json({reviews});
  })

  //create a review for a spot off spotid
  router.post("/:spotId/reviews",requireAuth, validateReview,isOwner,doesSpotExist,async (req, res) => {
	  const { review, stars } = req.body;

	  const { spotId } = req.params;

	  const reviewExists = await Review.findOne({
		where: {
		  spotId: spotId,
		  userId: ownerId,
		},
	  });

	  if (reviewExists) {
		return res.status(500).json({
		  message: "User already has a review for this spot",
		});
	  }

	  const newReview = await Review.create({
		spotId: +spotId,
		userId: ownerId,
		review,
		stars,
	  });

	  res.status(201).json(newReview);
	}
  );
