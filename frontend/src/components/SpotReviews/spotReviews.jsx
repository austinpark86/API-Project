import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { spotReviewsThunk } from "../../store/reviews"
import { useParams } from "react-router-dom"
import DeleteReview from '../DeleteReview/DeleteReview'
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import './SpotReviews.css'

function SpotReviews() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const reviewsObj = useSelector((state) => state.reviews)
    const reviewsArr = reviewsObj ? Object.values(reviewsObj):[];
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(spotReviewsThunk(spotId))
    }, [dispatch, spotId])

    if(!reviewsArr) return null

    function month(date) {
        const bookingDate = new Date(date)
        const month = bookingDate.getMonth()
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return months[month]
    }

    function year(date) {
        const bookingDate = new Date(date)
        const year = bookingDate.getFullYear()
        return year
    }

    return (
        <section>
            {reviewsArr.reverse().map((review) => (
                <div key={review.id}>
                    <h3 className="review-name">{review.User?.firstName}</h3>
                    <p className="review-date">{month(review.createdAt)} {year(review.createdAt)}</p>
                    <p className="review-comment">{review.review}</p>
                    {sessionUser?.id === review.User?.id && (
                        <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteReview reviewId={review.id} spotId={spotId}/>}/>
                    )}
                </div>
            ))}
        </section>
    )
}

export default SpotReviews;
