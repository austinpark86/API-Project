import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getCurrentSpotsThunk } from "../../store/spots";
import './CurrentSpots.css'
import OpenModalButton from "../OpenModalButton/OpenModalButton";


function CurrentSpots() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const spotsObj = useSelector((state) => state.spots)
    const spots = Object.values(spotsObj)

    useEffect(() => {
        if(!sessionUser) navigate('/')
        dispatch(getCurrentSpotsThunk())
    }, [dispatch, sessionUser, navigate])


}

export default CurrentSpots;
