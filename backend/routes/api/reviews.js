const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');
const { isOwner } = require('../../utils/validation');
const router = express.Router();

//get all reviews
router.get('/current', requireAuth, async (req, res) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,
                attributes: {
                    exclude: ["description", "createdAt", "updatedAt"]
                },
                include: {
                    model: SpotImage,
                    attributes: ["url"],
                    where: { preview: true }
                }
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    });

    let reviewArr = [];
    for (let key of reviews) {
        const realReview = key.toJSON();
        const spot = realReview.Spot;

        spot.previewImage = "";

        if (Array.isArray(spot.SpotImages) && spot.SpotImages.length > 0) {
            spot.previewImage = spot.SpotImages[0].url;
            delete spot.SpotImages;
        }

        reviewArr.push(realReview);
    }

    res.json({ Reviews: reviewArr });
})


module.exports=router;
