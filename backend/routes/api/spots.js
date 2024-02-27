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
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();
