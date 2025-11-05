import '../App.css'
import {  useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import ConfirmDelete from '../components/ConfirmDelete';

function PetProfilePage({ setPetToEdit }) {
    const { id } = useParams();
    const [pet, setPet] = useState({});
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const loadPet = async () => {
        const response = await fetch(`/pets/${id}`);
        const pet = await response.json();
        setPet(pet);
    };

    useEffect(() => {
            loadPet(); 
        }, []);

    const onDelete = async (_id) => {
        const response = await fetch(
            `/pets/${_id}`,
             { method: 'DELETE' }
        );
        if (response.status === 204) {
            navigate('/myPets');
        } else {
            alert(`Failed to delete pet with _id = ${_id}, status code = ${response.status}`)
        }
    };

    const onEdit = async petToEdit => {
        setPetToEdit(petToEdit);
        navigate('/editPet');
    };

    return (
        <div>
            <br></br>
            <button id="back" onClick={() => navigate('/myPets')}>
                    Back
            </button>
            <div className="profile-container">
                <h2>{pet.name}</h2>
                <p><strong>Species: </strong> {pet.species}</p>
                <p><strong>Breed: </strong> {pet.breed}</p>
                <p><strong>Sex: </strong> {pet.sex}</p>
                <p><strong>Date of Birth: </strong> {pet.dob}</p>
                <p><strong>Weight: </strong> {pet.weight} lbs</p>
                <MdOutlineDelete onClick={() => setShowConfirm(true)} />
                <span> </span>
                <MdOutlineEdit onClick={() => onEdit(pet)} />    
                {showConfirm && (
                    <ConfirmDelete prompt={`Are you sure you want to delete ${pet.name}? 
                    This action will result in the loss of pet data and cannot be undone.`}
                    onConfirm={() => onDelete(pet._id)}
                    onCancel={() => setShowConfirm(false)} />
                )}
            </div>
        </div>
    );
}


export default PetProfilePage;