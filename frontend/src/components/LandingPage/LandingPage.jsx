import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function AllSpots() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotsArray = spots ? Object.values(spots) : [];
  useEffect(() => {
    console.log("use effect trigger");

    dispatch(getAllSpotsThunk())
      .then(() => console.log("API call successful"))
      .catch((error) => console.error("Error fetching spots:", error));
    console.log("IN ALL SPOTS");

  }, [dispatch]);

  console.log("Spots:", spots);


  return (
    <section className="all-spots-section">
      <div className="spots-container">
        {spotsArray.length === 0 ? (
          <p>Loading...</p>
        ) : (
          spotsArray.map((spot) => (
            <div
              key={spot.id}
              className="spot-tile"
              onClick={() => navigate(`/spots/${spot.id}`)}
            >
              <div className="tool-tip">
                <img
                  className="all-spot-images"
                  src={spot.previewImage}
                  alt="preview"
                />
                <span className="tool-tip-text">{spot.name}</span>
              </div>
              <div className="text-container">
                <div className="spot-left">
                  <span>{`${spot.city}, ${spot.state}`}</span>
                  <p className="spot-prices">
                    <span style={{ fontWeight: "bold" }}>
                      {`$${Number(spot.price).toFixed(2)}`}
                    </span>{" "}
                    night
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default AllSpots;
