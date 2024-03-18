import { csrfFetch } from "./csrf";


const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_CURRENT_SPOTS = 'spots/getCurrentSpots';
const GET_SPOT = 'spots/getSpecificSpot';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';


const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

const getCurrentSpots = (spots) => {
    return {
        type: GET_CURRENT_SPOTS,
        spots
    }
}

const getSpecificSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}


export const getAllSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(getAllSpots(data))
        return data
    }
}

export const getCurrentSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(getCurrentSpots(data))
        return data
    }
}

export const getSpecificSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(getSpecificSpot(data))
        return data
    }
}

export const createSpotThunk = (spot, images) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })

    if(res.ok) {
        const data = await res.json()

        const resPreviewImage = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: images.previewImage,
                preview: true
            })
        })

        if(resPreviewImage.ok) {
            const previewImageData = await resPreviewImage.json()
            data.previewImage = previewImageData.url
        }

        const imageKeys = ['image1', 'image2', 'image3', 'image4']
        for(const key of imageKeys) {
            const imageUrl = images[key]

            if(imageUrl) {
                const resImage = await csrfFetch(`/api/spots/${data.id}/images`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        url: imageUrl,
                        preview: true
                    })
                })

                if(resImage.ok) {
                    const imageData = await resImage.json()
                    data[key] = imageData.url
                }
            }
        }

        dispatch(createSpot(data))
        return data
    }
}

export const updateSpotThunk = (updatedSpot, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedSpot)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(updateSpot(data))
        return data
    }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if(res.ok) {
        dispatch(deleteSpot(spotId))
    }
}


const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_ALL_SPOTS: {
            const newState = {}
            action.spots.Spots.forEach((spot) => (
                newState[spot.id] = spot
            ))
            return newState
        }
        case GET_CURRENT_SPOTS: {
            const newState = {}
            action.spots.Spots.forEach((spot) => (
                newState[spot.id] = spot
            ))
            return newState
        }
        case GET_SPOT: {
            const newState = {
                [action.spot.id]: action.spot
            }
            return newState
        }
        case CREATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        case DELETE_SPOT: {
            const newState = { ...state }
            delete newState[action.spotId]
            return newState
        }
        default:
            return state
    }
}

export default spotsReducer;
