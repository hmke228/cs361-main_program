import { useNavigate } from 'react-router-dom';
import PetTable from '../components/PetTable';
import {  useEffect, useState } from 'react';

export const MyPetsPage = () => {
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
    
    return (
        <div>
            <h2>My Pets</h2>
            <button onClick={() => navigate('/createPet')}>
                + Add A Pet
            </button>
            <br/>
            <br/>
            <PetTable pets={pets}></PetTable>

        </div>
    );
}


export default MyPetsPage;