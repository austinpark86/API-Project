import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { createSpotThunk } from "../../store/spots"
import { useNavigate } from 'react-router-dom';
import './CreateSpot.css'

function CreateSpot() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
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

        if(!previewImage) {
            errorsArr.push('Preview image is required')
            validationsObj.previewImage = 'Preview image is required'
        }

        const imageArr = [image1, image2, image3, image4]

        imageArr.forEach((image, index) => {
            if(image && !image.endsWith('.png') && !image.endsWith('.jpg') && !image.endsWith('.jpeg')) {
                errorsArr.push(`Image ${index + 2} URL must end in .png, .jpg, or .jpeg`)
            }
        })

        setErrors(errorsArr)
        setValidations(validationsObj)

    }, [navigate, sessionUser, country, address, city, state, description, name, price, previewImage, image1, image2, image3, image4])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newSpot = {
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

        const newImages = {
            previewImage,
            image1,
            image2,
            image3,
            image4
        }

        const submit = await dispatch(createSpotThunk(newSpot, newImages))

        navigate(`/spots/${submit.id}`)
    }


}

export default CreateSpot;
