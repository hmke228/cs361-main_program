import { useNavigate } from 'react-router-dom';
import PetTable from '../components/PetTable';
import {  useEffect, useState } from 'react';


function MyPetsPage({ setPetToEdit }) {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    const loadPets= async () => {
        const response = await fetch('/pets');
        const pets = await response.json();
        setPets(pets);
    };

    useEffect(() => {
            loadPets(); 
        }, []);

    const onDelete = async (_id) => {
        const response = await fetch(
            `/pets/${_id}`,
             { method: 'DELETE' }
        );
        if (response.status === 204) {
        setPets(pets.filter( m => m._id !== _id))
        } else {
            alert(`Failed to delete pet with _id = ${_id}, status code = ${response.status}`)
        }
    };

    const onEdit = async petToEdit => {
        setPetToEdit(petToEdit);
        navigate('/editPet');
    };
    

    return (
        <>
            <h2>My Pets</h2>
            <button onClick={() => navigate('/createPet')}>
                + Add A Pet
            </button>
            <br/>
            <br/>
            <PetTable pets={pets} onDelete={onDelete} onEdit={onEdit}></PetTable>

        </>

        
    );
}


export default MyPetsPage;