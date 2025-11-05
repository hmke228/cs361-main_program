import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreatePetPage = () => {

    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [sex, setSex] = useState('');
    const [dob, setDob] = useState('');
    const [weight, setWeight] = useState('');

    const navigate = useNavigate()

    const addPet = async (e) => {
        e.preventDefault()
        const newPet = { name, species, breed, sex, dob, weight };
        const response = await fetch('/pets', {
            method: 'POST',
            body: JSON.stringify(newPet),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.status === 201){
            alert("Successfully Created Pet!");
        } else {
            alert(`Failed to add pet. Status code = ${response.status}`);
        }
        navigate("/myPets");

    };

    return (
        <div>
            <br/>
            <button id="back" onClick={() => navigate('/myPets')}>
                Back
            </button>
            <h2>Add A Pet</h2>
            <form>
                <fieldset>
                     <legend>Pet Information</legend>
                        <label htmlFor="name">Name: </label>
                            <input type="text" id="name" value={name} required
                            onChange={e => setName(e.target.value)} />
                        <br/>
                            <label htmlFor="species">Species: </label>
                            <input type="text" id="species" value={species}
                            onChange={e => setSpecies(e.target.value)} />
                        <br/>
                        <label htmlFor="breed">Breed: </label>
                            <input type="text" id="breed" value={breed}
                            onChange={e => setBreed(e.target.value)} />
                        <br/>
                            <label htmlFor="sex">Sex: </label>
                            <select id="sex" value={sex} 
                            onChange={e => setSex(e.target.value)}>
                            <option value="" disabled>Select One</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
                        <br/>
                            <label htmlFor="dob">Date of Birth: </label>
                            <input type="text" id="dob" value={dob} placeholder="MM-DD-YY"
                            onChange={e => setDob(e.target.value)} />
                        <br/>
                         <label htmlFor="weight">Weight: </label>
                            <input type="number" id="weight" value={weight}
                            onChange={e => setWeight(e.target.valueAsNumber)} />
                            <span> lbs </span>
                        <br/>
                </fieldset>
                <br/>
                <button
                    onClick={addPet}
                >Save Pet</button>
            </form>
        </div>
    );
}


export default CreatePetPage;