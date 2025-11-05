import '../App.css'
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";


function PetRow({ pet, onDelete, onEdit}) {

    return (
        <tr className="collection-item">
            <td>{pet.name}</td>
            <td>
            <MdOutlineDelete onClick={() => onDelete(pet._id)} />
            <MdOutlineEdit onClick={() => onEdit(pet)} />
            </td>
        </tr>
    );
}

export default PetRow;