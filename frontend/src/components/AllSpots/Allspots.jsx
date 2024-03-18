import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots"
import './AllSpots.css'
import { useNavigate } from "react-router-dom";

function AllSpots() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const spotsObj = useSelector((state) => state.spots)
    const spots = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    return (
        <section className="all-spots-section">
            <div className="all-spots-container">
                {spots.map((spot) => (
                    <div key={spot.id} className='spots' onClick={() => navigate(`/spots/${spot.id}`)}>
                        <div className="all-spot-tool">
                            <img className='all-spot-images' src={spot.previewImage} alt='preview' />
                            <span className="tool-text">{spot.name}</span>
                        </div>
                        <div className="text-container">
                            <div className="all-spot-left">
                                <span>{`${spot.city}, ${spot.state}`}</span>
                                <p className="all-spot-prices"><span style={{fontWeight: 'bold'}}>{`$${Number(spot.price).toFixed(2)}`}</span> night</p>
                            </div>
                            <div className="all-spot-right">
                                <i className="fas fa-star">{` ${spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}`}</i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AllSpots;
