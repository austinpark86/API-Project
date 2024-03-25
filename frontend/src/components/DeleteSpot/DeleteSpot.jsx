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
    return (
        <form className='delete-form' onSubmit={handleDelete}>
            <h2 className="delete-spot-h2">Confirm Delete</h2>
            <p>Do you want to Delete this Listing?</p>
            <div className="delete-buttons">
                <button className='yes-button' type="submit">(Im Sure I want to Delete) YES</button>
                <button className='no-button' onClick={() => closeModal()}>No, Return</button>
            </div>
        </form>
    )

}

export default DeleteSpot;
