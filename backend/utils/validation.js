const { validationResult } = require('express-validator');
const { Spot, Review, Booking, ReviewImage, SpotImage } = require("../db/models");
const { check, query } = require("express-validator");
const { Op } = require("sequelize");
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validatePost = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Country is required"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 49 })
    .notEmpty()
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .isString()
    .notEmpty()
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isFloat({ min: 0.01 })
    .withMessage("Price is required"),
  handleValidationErrors,
];

const validateDates = [
  check("startDate")
    .exists({ checkFalsy: true })
    .custom((val, { req }) => {
      const currentDate = new Date();
      if (new Date(val) <= currentDate) {
        throw new Error("StartDate cannot be in the past");
      }
      return true;
    }),
  check("endDate")
    .exists({ checkFalsy: true })
    .custom((val, { req }) => {
      const startDate = new Date(req.body.startDate);
      if (new Date(val) <= startDate) {
        throw new Error("endDate cannot be on or before startDate");
      }
      return true;
    }),
  handleValidationErrors,
];

const validateQueryFilters = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  query("size")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1"),
  query("maxLat")
    .optional()
    .isInt({ min: -90, max: 90 })
    .withMessage("Maximum latitude is invalid"),
  query("minLat")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Minimum latitude is invalid"),
  query("minLng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Maximum longitude is invalid"),
  query("maxLng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Minimum longitude is invalid"),
  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

// Check if a spot is valid
const spotChecker = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city")
    .exists( { checkFalsy: true })
    .withMessage("City is required"),
  check("state")
    .exists( { checkFalsy: true })
    .withMessage("State is required"),
  check("country")
    .exists( { checkFalsy: true })
    .notEmpty()
    .withMessage("Country is required"),
  check("lat")
    .exists( { checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check("lng")
    .exists( { checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check("name")
    .exists( { checkFalsy: true })
    .isLength( { min: 1, max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists( { checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists( { checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors
]

const getAllSpots = async (all) => {
  const spotArray = [];

  for (let spot of all) {
    const spotJson = spot.toJSON();

    const starTotal = await Review.sum("stars", { where: { spotId: spotJson.id } });
    const numStars = await Review.count({ where: { spotId: spotJson.id } });

    const spotImage = await SpotImage.findOne({ where: { spotId: spotJson.id, preview: true } });
    const preview = spotImage ? spotImage.toJSON().url : null;

    const avgStars = numStars ? parseFloat((starTotal / numStars).toFixed(1)) : 'New';

    spotArray.push({ ...spotJson, avgStars, preview });
  }

  return spotArray;
};

//check if spot exists
const doesSpotExist=async (req, res, next) =>{
const { spotId } = req.params;
	const spot = await Spot.findByPk(parseInt(spotId));

	if (!spot) {
		const error = new Error("Spot couldn't be found");
		res.status(404);
		return res.json({ message: error.message });
	}
  next();
}

//check if owner is right
const isOwner=async(req,res,next)=>{
  const {spotId} = req.params;

	const spot = await Spot.findByPk(spotId);

	if (req.user.id !== spot.ownerId) {
		res.status(403).json({
			message: "Do not have permission to access spot",
		});
	}
}
module.exports = {
  handleValidationErrors,spotChecker,getAllSpots,doesSpotExist,validateReview,validateDates,validateQueryFilters,validatePost,isOwner
};
