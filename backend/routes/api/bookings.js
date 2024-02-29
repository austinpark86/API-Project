const express = require('express');
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    let bookings = await Booking.findAll({
        where: { userId: user.id }
    })
    let arr = [];

    for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i]

        let spot = await Spot.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt', 'description'] },
            where: { id: booking.spotId }
        })

        const imagePreview = await SpotImage.findOne({
            attributes: ['url'],
            where: { spotId: booking.spotId, preview: true }
        })

        booking = booking.toJSON();
        spot = spot.toJSON();
        spot.imagePreview = imagePreview ? imagePreview.url : null
        booking.Spot = spot;

        arr.push(booking)
    }

    return res.json({ Bookings: arr })
})

module.exports=router;
