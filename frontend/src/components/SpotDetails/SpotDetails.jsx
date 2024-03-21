import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificSpotThunk } from "../../store/spots";
import { useParams } from "react-router";
//import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './SpotDetails.css'

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots[spotId])
  //  const sessionUser = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(getSpecificSpotThunk(spotId))
    }, [dispatch, spotId])

    if(!spot) return null

    const reserve = (e) => {
        e.preventDefault()
        window.alert('Feature Coming Soon...')
    }

   return (
        <section className="spot-details-section">
            <h1>{spot.name}</h1>
            <span className="spot-location">{spot.city}, {spot.state}, {spot.country}</span>
            <div className="image-container">
                <div className="large-image-section">
                    <img className="large-image" src={spot.SpotImages?.[0]?.url} alt={spot.SpotImages ? spot.SpotImages[0]?.url : null} />
                </div>
                <div className="small-images-section">
                    <img className="small-images" src={spot.SpotImages?.[1]?.url} alt={spot.SpotImages ? spot.SpotImages[1]?.url : null} />
                    <img className="small-images" src={spot.SpotImages?.[2]?.url} alt={spot.SpotImages ? spot.SpotImages[2]?.url : null} />
                    <img className="small-images" src={spot.SpotImages?.[3]?.url} alt={spot.SpotImages ? spot.SpotImages[3]?.url : null} />
                </div>
            </div>
            <div className="middle-section">
                <div className="description">
                    <h1 className="host-name">Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h1>
                    <p>{spot.description}</p>
                </div>
                <div className="reserve-box">
                    <div className="reserve-box-info">
                        <div className="reserve-box-left">
                            <p className="spot-price"><span className='spot-price-number' style={{fontWeight: 'bold', fontSize: 'x-large'}}>{`$${Number(spot.price).toFixed(2)}`}</span>night</p>
                        </div>

                    </div>
                    <button onClick={reserve} className="reserve-button">Reserve</button>
                </div>
            </div>

        </section>
    )

}

export default SpotDetails;
