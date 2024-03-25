import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spotReviewsThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";
import DeleteReview from '../DeleteReview/DeleteReview';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./SpotReviews.css";

function SpotReviews() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const reviewsObj = useSelector((state) => state.reviews);
  const reviewsArr = reviewsObj ? Object.values(reviewsObj) : [];
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(spotReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (reviewsArr.length === 0) return <p>No reviews available.</p>;

  function formatDate(date) {
    const bookingDate = new Date(date);
    const month = bookingDate.toLocaleString("default", { month: "long" });
    const year = bookingDate.getFullYear();
    return `${month} ${year}`;
  }

  return (
    <section className="spot-reviews">
      {reviewsArr.reverse().map((review) => (
        <div key={review.id} className="review">
          <h3 className="review-name">{review.User?.firstName}</h3>
          <p className="review-date">{formatDate(review.createdAt)}</p>
          <p className="review-comment">{review.review}</p>
          {sessionUser?.id === review.User?.id && (
            <OpenModalButton
              buttonText={"Delete"}
              modalComponent={<DeleteReview reviewId={review.id} spotId={spotId}/>}
            />
          )}
        </div>
      ))}
    </section>
  );
}

export default SpotReviews;
