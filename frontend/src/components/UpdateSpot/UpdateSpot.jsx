import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { updateSpotThunk } from "../../store/spots"
import { useNavigate, useParams } from 'react-router-dom';

function UpdateSpot() {
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots[spotId])
    const sessionUser = useSelector((state) => state.session.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [description, setDescription] = useState(spot?.description)
    const [name, setName] = useState(spot?.name)
    const [price, setPrice] = useState(spot?.price)
    const [errors, setErrors] = useState([])
    const [validations, setValidations] = useState({})

    useEffect(() => {
        if(!sessionUser) navigate('/')
        const errorsArr = []
        const validationsObj = {}

        if(!country) {
            errorsArr.push('Country is required')
            validationsObj.country = 'Country is required'
        }

        if(!address) {
            errorsArr.push('Address is required')
            validationsObj.address = 'Address is required'
        }

        if(!city) {
            errorsArr.push('City is required')
            validationsObj.city = 'City is required'
        }

        if(!state) {
            errorsArr.push('State is required')
            validationsObj.state = 'State is required'
        }

        if(String(description).length < 30) {
            errorsArr.push('Description needs a minimum of 30 characters')
            validationsObj.description = 'Description needs a minimum of 30 characters'
        }

        if(!name) {
            errorsArr.push('Name is required')
            validationsObj.name = 'Name is required'
        }

        if(!Number(price)) {
            errorsArr.push('Price is required')
            validationsObj.price = 'Price is required'
        }

        setErrors(errorsArr)
        setValidations(validationsObj)

    }, [navigate, sessionUser, country, address, city, state, description, name, price])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedSpot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            lat: 1,
            lng: 1
        }

        const submit = await dispatch(updateSpotThunk(updatedSpot, spotId))

        navigate(`/spots/${submit.id}`)
    }


}

export default UpdateSpot;
