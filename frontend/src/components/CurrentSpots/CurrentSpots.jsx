import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getCurrentSpotsThunk } from "../../store/spots";
import './CurrentSpots.css'
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpot from "../DeleteSpot/DeleteSpot";

function CurrentSpots() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const spotsObj = useSelector((state) => state.spots)
    const spots = spotsObj ? Object.values(spotsObj) : [];

    useEffect(() => {
        if(!sessionUser) navigate('/')
        dispatch(getCurrentSpotsThunk())
    }, [dispatch, sessionUser, navigate])

    return (
        <>
            {sessionUser && (
                <div className="main-spots-section">
                    <div className="manage-spots-container">
                        <h1 className="manage-title">Manage Your Spots</h1>
                        <button className='create-new-spot-button' onClick={() => navigate('/spots/new')}>Create a New Spot</button>
                    </div>
                    <div className="spots-container">
                        {spots.map((spot) => (
                            <div key={spot.id}>
                                <div className='spot-tile' onClick={() => navigate(`/spots/${spot.id}`)}>
                                    <img className='spot-image' src={spot.previewImage} alt='preview' />
                                    <div className="text-container">
                                        <div className="spot-left">
                                            <span>{`${spot.city}, ${spot.state}`}</span>
                                            <p className="spot-prices"><span style={{fontWeight: 'bold'}}>{`$${Number(spot.price).toFixed(2)}`}</span> night</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="manage-buttons">
                                    <button className='update-spot-button' onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button>
                                    <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteSpot spotId={spot.id}/>}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default CurrentSpots;
