import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";
import './DeleteSpot.css'

function DeleteSpot({ spotId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(deleteSpotThunk(spotId))
        .then(closeModal)
    }


}

export default DeleteSpot;
