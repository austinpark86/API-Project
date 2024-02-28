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

//add an image to a review from review id
router.post("/:reviewId/images", requireAuth,isOwner, async (req, res) => {
    const { reviewId } = req.params;

    const { url } = req.body;

    const id = await Review.findByPk(reviewId);

    if (!id) {
      return res.status(404).json({message: "Review couldn't be found"});
    }

    let findReview = await ReviewImage.findAll({
      where: {
        reviewId: reviewId
      },
    });

    if (findReview.length >= 10)
      return res.status(403).json({message: "Maximum number of images for this resource was reached",});

    const newImage = await ReviewImage.create({ reviewId, url });

    res.json({
      id: newImage.id,
      url: newImage.url,
    });
  });
