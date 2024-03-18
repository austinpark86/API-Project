import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificSpotThunk } from "../../store/spots";
import { useParams } from "react-router";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './SpotDetails.css'

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots[spotId])
    const sessionUser = useSelector((state) => state.session.user)
    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(getSpecificSpotThunk(spotId))
    }, [dispatch, spotId])

    if(!spot || !reviews) return null

    const reserve = (e) => {
        e.preventDefault()
        window.alert('Feature Coming Soon...')
    }

    function ratings() {
        if(spot.avgRating && spot.numReviews === 1) {
            return `${spot.avgRating.toFixed(1)} · ${spot.numReviews} review`
        } else if(spot.avgRating && spot.numReviews > 1) {
            return `${spot.avgRating.toFixed(1)} · ${spot.numReviews} reviews`
        } else {
            return 'New'
        }
    }

}

export default SpotDetails;
