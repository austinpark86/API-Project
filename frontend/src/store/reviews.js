import { csrfFetch } from "./csrf";
import { getSpecificSpotThunk } from "./spots";


const SPOT_REVIEWS = 'reviews/spotReviews';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';


const spotReviews = (reviews) => {
    return {
        type: SPOT_REVIEWS,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

// thunks
export const spotReviewsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(spotReviews(data))
        return data
    }
}

export const createReviewThunk = (review, spotId, sessionUser) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(createReview({...data, User: sessionUser}))
        dispatch(getSpecificSpotThunk(spotId))
        return data
    }
}

export const deleteReviewThunk = (reviewId, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        dispatch(deleteReview(reviewId))
        dispatch(getSpecificSpotThunk(spotId))
    }
}

// reducer
const reviewsReducer = (state = {}, action) => {
    switch(action.type) {
        case SPOT_REVIEWS: {
            const newState = {}
            action.reviews.Reviews.forEach((review) => (
                newState[review.id] = review
            ))
            return newState
        }
        case CREATE_REVIEW:
            return { ...state, [action.review.id]: action.review }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState[action.reviewId]
            return newState
        }
        default:
            return state
    }
}

export default reviewsReducer;
