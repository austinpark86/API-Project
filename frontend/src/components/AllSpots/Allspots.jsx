import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {getAllSpotsThunk}  from "../../store/spots"
import './AllSpots.css'
import { useNavigate } from "react-router-dom";

function AllSpots() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const spotsObj = useSelector((state) => state.spots)
    const spots = spotsObj ? Object.values(spotsObj) : [];

    useEffect(() => {
        console.log('use effect trigger')
        dispatch(getAllSpotsThunk())
        console.log('IN ALL SPOTS')
    }, [dispatch])

    return (
        <section className="all-spots-section">
            <div className="spots-container">
                {spots.map((spot) => (
                    <div key={spot.id} className='spot-tile' onClick={() => navigate(`/spots/${spot.id}`)}>
                        <div className="tool-tip">
                            <img className='all-spot-images' src={spot.previewImage} alt='preview' />
                            <span className="tool-tip-text">{spot.name}</span>
                        </div>
                        <div className="text-container">
                            <div className="spot-left">
                                <span>{`${spot.city}, ${spot.state}`}</span>
                                <p className="spot-prices"><span style={{fontWeight: 'bold'}}>{`$${Number(spot.price).toFixed(2)}`}</span> night</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AllSpots;
